"""
API Flask para Parser de Notas Fiscais Eletrônicas (NFC-e)
Versão melhorada com suporte a múltiplos layouts de diferentes estados
"""

from PIL import Image, ImageEnhance
import re
from typing import List, Dict, Any, Optional
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from flask_cors import CORS
from base64 import b64decode
import io
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

app = Flask(__name__)
CORS(app)


@app.route("/teste", methods=["GET"])
def aoba():
    """Rota de teste para verificar se a API está funcionando"""
    return jsonify({"message": "To vivo!"})


@app.route("/parse_nfce_url", methods=["GET"])
def parse_nfce_url():
    """
    Rota principal para processar uma NFC-e a partir de sua URL
    """
    try:
        url_qr = request.args.get('url')

        if not url_qr:
            return jsonify({
                "status": "error", 
                "message": "URL parameter is missing"
            }), 400

        session = requests.Session()
        retry_strategy = Retry(
            total=3,
            backoff_factor=2,
            status_forcelist=[429, 500, 502, 503, 504],
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        session.mount("http://", adapter)
        session.mount("https://", adapter)
        
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1"
        }
        
        html = session.get(url_qr, headers=headers, timeout=45).text
        dados = parse_nfce_html_dynamic(html)
        
        return jsonify({
            "status": "success", 
            "qrcode_data": url_qr, 
            "nfce_data": dados
        })

    except requests.exceptions.Timeout:
        return jsonify({"error": "Timeout: O servidor da Fazenda não respondeu a tempo. Tente novamente."}), 504
    except requests.exceptions.ConnectionError as ce:
        return jsonify({"error": f"Erro de conexão: {str(ce)}"}), 503
    except requests.exceptions.RequestException as re_exc:
        return jsonify({"error": f"Erro na requisição: {re_exc}"}), 500
    except Exception as e:
        return jsonify({"error": f"Erro ao processar: {e}"}), 500


@app.route("/debug-upload", methods=["POST"])
def debug_upload():
    """Rota auxiliar para debug de uploads"""
    info = {
        "content_type": request.content_type,
        "has_files": bool(request.files),
        "file_keys": list(request.files.keys()),
        "data_len": len(request.data or b""),
        "is_json": request.is_json,
        "json_keys": list((request.get_json(silent=True) or {}).keys()),
    }
    return jsonify(info)


# =============================
# FUNÇÕES AUXILIARES
# =============================

def to_float_br(s: Optional[str]) -> Optional[float]:
    """Converte string em formato brasileiro (1.234,56) para float"""
    if not s:
        return None
    
    s = s.strip().replace("\xa0", " ")
    s = s.replace(".", "").replace(",", ".")
    
    try:
        return float(s)
    except ValueError:
        return None


def clean_txt(s: Optional[str]) -> Optional[str]:
    """Remove espaços extras e normaliza texto"""
    if not s:
        return None
    return re.sub(r"\s+", " ", s).strip()


# =============================
# EXTRATORES DE DADOS MELHORADOS
# =============================

def extract_establishment_info(soup: BeautifulSoup) -> Dict[str, Any]:
    """
    Extrai informações do estabelecimento (nome e CNPJ)
    Funciona com múltiplos layouts
    """
    result = {
        "estabelecimento": None,
        "cnpj": None
    }

    # Tenta extrair nome do estabelecimento
    # Procura por div com class txtTopo ou id u20
    nome_tag = soup.select_one("div.txtTopo") or soup.select_one("#u20")
    if nome_tag:
        result["estabelecimento"] = clean_txt(nome_tag.get_text())
    
    # Extrai CNPJ - busca por padrão em divs text ou qualquer elemento
    for element in soup.find_all(string=re.compile(r"CNPJ|cnpj", re.I)):
        context = element.parent.get_text(" ", strip=True) if element.parent else str(element)
        m = re.search(r"\b\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2}\b", context)
        if m:
            result["cnpj"] = m.group(0)
            break

    return result


def extract_totals_flexible(soup: BeautifulSoup) -> Dict[str, Any]:
    """
    Extrai totais da nota (quantidade, valor a pagar, forma de pagamento)
    Funciona com diferentes estruturas HTML
    """
    result = {
        "total_itens": None,
        "valor_pagar": None,
        "forma_pagamento": None
    }

    # Procura bloco de totais - pode estar em #totalNota ou similar
    total_section = soup.select_one("#totalNota") or soup.find("div", class_="txtRight")
    
    if not total_section:
        return result

    # Extrai todas as linhas de total (flexível com ids e classes)
    linhas = total_section.select("[id*='linhaTotal'], .linhaShade")
    
    for linha in linhas:
        label_elem = linha.select_one("label")
        valor_elem = linha.select_one(".totalNumb")
        
        if not (label_elem and valor_elem):
            continue

        label_text = clean_txt(label_elem.get_text(" ", strip=True))
        valor_text = clean_txt(valor_elem.get_text(" ", strip=True))

        # Identifica qual tipo de informação é baseado no rótulo
        if re.search(r"qtd\.?[\s*]total[\s*]de[\s*]itens", label_text, re.I):
            m = re.search(r"\d+", valor_text)
            if m:
                result["total_itens"] = int(m.group(0))

        elif re.search(r"valor[\s*]a[\s*]pagar", label_text, re.I):
            result["valor_pagar"] = to_float_br(valor_text)

        elif re.search(r"forma[\s*]de[\s*]pagamento|cartão|débito|crédito|pix", label_text, re.I):
            # Se o rótulo contém tipo de pagamento, extrai dele
            if re.search(r"cartão|débito|crédito|pix|dinheiro", label_text, re.I):
                result["forma_pagamento"] = label_text
            else:
                # Caso contrário, tenta o próximo elemento
                resultado_pagto = label_elem.find_next(string=True)
                if resultado_pagto:
                    pagto_text = clean_txt(resultado_pagto)
                    if pagto_text and not re.search(r"valor|qtd|itens|tributos", pagto_text, re.I):
                        result["forma_pagamento"] = pagto_text

    # Se não encontrou forma de pagamento nas linhas, busca em divs específicas
    if not result["forma_pagamento"]:
        for div in total_section.find_all("div"):
            label = div.select_one("label.tx")
            if label:
                txt = clean_txt(label.get_text())
                if txt and re.search(r"cartão|débito|crédito|pix|dinheiro", txt, re.I):
                    result["forma_pagamento"] = txt
                    break

    return result


def extract_items_robust(soup: BeautifulSoup) -> List[Dict[str, Any]]:
    """
    Extrai itens com suporte a múltiplas estruturas
    """
    itens: List[Dict[str, Any]] = []

    # Procura tabela de itens
    table = soup.select_one("table#tabResult")
    if not table:
        return itens

    # Seleciona todas as linhas de item
    rows = table.select('tr[id*="Item"]')
    
    for tr in rows:
        # Extrai descrição (classe txtTit2)
        desc_tag = tr.select_one(".txtTit2")
        descricao = clean_txt(desc_tag.get_text()) if desc_tag else None
        
        if not descricao:
            continue

        # Extrai código
        codigo = None
        cod_tag = tr.select_one(".RCod")
        if cod_tag:
            m = re.search(r"\b(\d+)\b", cod_tag.get_text())
            if m:
                codigo = m.group(1)

        # Extrai quantidade
        quantidade = None
        qtd_tag = tr.select_one(".Rqtd")
        if qtd_tag:
            m = re.search(r"Qtde\.\s*:\s*([\d\.,]+)", qtd_tag.get_text(), re.I)
            if m:
                quantidade = to_float_br(m.group(1))

        # Extrai unidade
        unidade = None
        un_tag = tr.select_one(".RUN")
        if un_tag:
            m = re.search(r"UN\s*:\s*([A-Za-z]+)", un_tag.get_text(), re.I)
            if m:
                unidade = m.group(1).upper()

        # Extrai valor unitário
        valor_unit = None
        vu_tag = tr.select_one(".RvlUnit")
        if vu_tag:
            m = re.search(r"Vl\.\s*Unit\.\s*:\s*([\d\.,]+)", vu_tag.get_text(), re.I)
            if m:
                valor_unit = to_float_br(m.group(1))

        # Extrai valor total do item
        valor_total = None
        vt_tag = tr.select_one(".txtTit3")
        if vt_tag:
            valor_span = vt_tag.find("span", class_="valor")
            if valor_span:
                m = re.search(r"([\d\.,]+)", valor_span.get_text())
                if m:
                    valor_total = to_float_br(m.group(1))

        itens.append({
            "codigo": codigo,
            "descricao": descricao,
            "quantidade": quantidade,
            "unidade": unidade,
            "valor_unit": valor_unit,
            "valor_total": valor_total,
        })

    return itens


def group_duplicate_items(itens: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Agrupa itens duplicados somando quantidades e valores
    """
    grouped: Dict[str, Dict[str, Any]] = {}
    
    for item in itens:
        desc = item.get("descricao")
        if desc:
            if desc not in grouped:
                grouped[desc] = {
                    "codigo": item.get("codigo"),
                    "descricao": desc,
                    "quantidade": item.get("quantidade") or 0,
                    "unidade": item.get("unidade"),
                    "valor_unit": item.get("valor_unit"),
                    "valor_total": item.get("valor_total") or 0,
                }
            else:
                # Soma quantidade e valor
                grouped[desc]["quantidade"] = (grouped[desc].get("quantidade") or 0) + (item.get("quantidade") or 0)
                grouped[desc]["valor_total"] = (grouped[desc].get("valor_total") or 0) + (item.get("valor_total") or 0)

    return list(grouped.values())


# =============================
# FUNÇÃO PRINCIPAL DE PARSING
# =============================

def parse_nfce_html_dynamic(html: str) -> Dict[str, Any]:
    """
    Função principal que orquestra a extração de dados
    Combina múltiplos extratores para máxima compatibilidade
    """
    soup = BeautifulSoup(html, "lxml")

    # Executa os extratores
    estabelecimento = extract_establishment_info(soup)
    totais = extract_totals_flexible(soup)
    items_raw = extract_items_robust(soup)
    items_grouped = group_duplicate_items(items_raw)

    # Monta resultado final
    result = {
        "estabelecimento": estabelecimento.get("estabelecimento"),
        "cnpj": estabelecimento.get("cnpj"),
        "total_itens": totais.get("total_itens") or len(items_grouped),
        "valor_pagar": totais.get("valor_pagar"),
        "forma_pagamento": totais.get("forma_pagamento"),
        "itens": items_grouped,
    }
    
    return result


# =============================
# INICIALIZAÇÃO DO SERVIDOR
# =============================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
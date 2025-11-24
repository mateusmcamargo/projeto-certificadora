import React, { useState } from 'react'
import { PurchasesDraftProvider } from '../hooks/PurchasesDraftContext';
import { nanoid } from 'nanoid';
import { addPurchases } from '../useCases/purchaseCRUD';
import { useAuth } from '../hooks/AuthContext';

export const PurchasesManagerDraftLogic = ({children}) => {
    const [purchasesList, setPurchasesList] = useState([]);
    const [selectedPurchases, setSelectedPurchases] = useState([]);
    const [changesForm, setChangesForm] = useState({name:"", category:"", qtd:0, price:0})
    const [isLoadingApi, setIsLoadingApi] = useState(false);
    const [apiError, setApiError] = useState(null);

    const addPurchase = () => {
      setPurchasesList((prevPurchasesList) => [
        { id:nanoid(), name: "Carne moída 500 g", category: "carne", price: 10, qtd:1 }, 
        ...prevPurchasesList
      ]);
    }

    const addMultiplePurchases = async (qrcodeUrl) => {
      setIsLoadingApi(true);
      setApiError(null);

      try {
        const response = await fetch(`http://localhost:5000/parse_nfce_url?url=${encodeURIComponent(qrcodeUrl)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success' && data.nfce_data && data.nfce_data.itens) {
          const newPurchases = data.nfce_data.itens.map(item => ({
            id: nanoid(),
            name: item.descricao || 'Sem descrição',
            category: 'Nota Fiscal',
            price: item.valor_unit || 0,
            qtd: item.quantidade || 1,
            codigoNF: item.codigo,
            unidade: item.unidade,
            valorTotal: item.valor_total
          }));

          setPurchasesList((prevPurchasesList) => [...newPurchases, ...prevPurchasesList]);

          setIsLoadingApi(false);
          return {
            success: true,
            itemsAdded: newPurchases.length,
            nfceData: data.nfce_data
          };
        } else {
          throw new Error('Nenhum item encontrado na nota fiscal');
        }

      } catch (error) {
        console.error('Erro ao buscar dados da NFC-e:', error);
        setApiError(error.message);
        setIsLoadingApi(false);
        return {
          success: false,
          error: error.message
        };
      }
    }

    const changePurchase = ()=>{}
    
    const deletePurchase = ()=>{}
    
    const deletePurchases = ()=>{
      setPurchasesList(purchasesList => purchasesList.filter(el => !selectedPurchases.some(({id})=> el.id==id)))
      setSelectedPurchases([])
    }
    
    const onChangesConfirm = () => {
      setPurchasesList (puchasesList => {
        return puchasesList.map((el) => {
          if(selectedPurchases.some(({id}) => el.id == id)) return {...el, ...changesForm}
          return el;
        })        
      });
      setSelectedPurchases([]);
    }
    
    const onChangesCancel = () => { setSelectedPurchases([]); }

    const [selectedCardId, setSelectedCardId] = useState("");

    const handleCardSelection = (cardId) => {
      setSelectedCardId(cardId);
    }

    const [group, setGroup] = useState({id:nanoid(), authorize:true, idUser:"usuario1", name:"", createdAt:{dia:16,mes:9,ano:2025}});
    const {authData} = useAuth();

    const save = ()=>{
      const purchases = purchasesList.map(el => ({...el, userId:authData.user.email, cartaoId:selectedCardId}));
      addPurchases(purchases)
      .then((ids) => {console.log("Compras salvas com IDs: ", ids)})
      .catch(err => console.error("Erro ao salvar compras: ", err));
    }

  return (
    <PurchasesDraftProvider value={{
      purchasesList,
      setPurchasesList,
      addPurchase,
      addMultiplePurchases,
      changePurchase,
      deletePurchase,
      deletePurchases,
      selectedPurchases,
      setSelectedPurchases,
      changesForm,
      setChangesForm,
      onChangesConfirm,
      onChangesCancel,
      selectedCardId,
      handleCardSelection,
      group,
      setGroup,
      save,
      isLoadingApi,
      apiError
    }}>
      {children}
    </PurchasesDraftProvider>
  );
}
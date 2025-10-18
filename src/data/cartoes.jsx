export const cartoes = [
    {
        id:"i3j32",
        nome:"dinheiro",
        tipo:"dinheiro",
        createdAt:{dia:20,mes:2,ano:2020}, // criar no mesmo dia da criação da conta
        // não permitir exclusão desse "cartão".
    },
    {
        id:"33k4o",
        nome:"cartão para dívidas",
        tipo:"crédito",
        limite:5000,
        fechamentoDia:5,
        vencimentoDia:25,
        juros:0.1,
        createdAt:{dia:20,mes:2,ano:2020},
        faturas:["idFatura1", "idFatura2", "idFatura3"],
    },
    {
        id:"26f4b",
        nome:"cartão de compras",
        tipo:"débito",
        juros:0.1,
        createdAt:{dia:12,mes:5,ano:2022},
        saldo:1000
    },
]
/*
export interface Card {
  id: string;                         // id gerado pelo Firestore
  nome: string;                       // Ex: "Nubank", "Caixa", "Dinheiro"
  tipo: "crédito" | "débito" | "dinheiro";
  limite?: number;                    // só se tipo = crédito
  fechamentoDia?: number;             // dia do fechamento da fatura
  vencimentoDia?: number;             // dia do pagamento
  saldo?: number;                     // só se tipo = débito
  juros?: number;
  criadoEm: FirebaseFirestore.Timestamp;
}
*/
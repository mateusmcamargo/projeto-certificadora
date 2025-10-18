export const compras = [
    {
        id:"sdojw",
        userId:"usuario1",
        cartaoId:"i3j32",
        faturaId:"idFatura1",
        title:"Requeijão",
        category:"Laticínio",
        price:20.99,
        qtd:2,
        data:null//formato de data ideal
    },
    {
        userId:"usuario2",
        id:"ethvf",
        cartaoId:"hn267",
        title:"Bisteca suína 500g",
        category:"Carne",
        price:40.99,
        qtd:1,
        data:null//formato de data ideal
    },
    {
        cartaoId:"s3j66",
        title:"Requeijão",
        category:"Laticínio",
        price:10.99,
        qtd:5,
        data:null//formato de data ideal
    }    
]
/*
export interface Purchase {
  id: string;
  userId: string;                  // id do usuário dono da compra
  title: string;                    // "Requeijão"
  category: string;                 // "Laticínio"
  price: number;                    // 20.99
  qtd: number;                      // 2
  cartaoId: string;                 // pode ser "dinheiro" também
  faturaId?: string;                // opcional
  data: FirebaseFirestore.Timestamp;
  criadoEm: FirebaseFirestore.Timestamp;
}
*/
const faturas = [
    {
        id:"idFatura1",
        idUser:"usuario1",
        dataAbertura:{},
        dataFechamento:{},

    },
    {
        id: "idFatura2",
        cartaoId: "c1",                 // referência ao cartão
        mesReferencia: FirebaseFirestore.Timestamp,            // ex: "2025-10"
        valorTotal: 1000,
        pago: false,
        dataCriacao: FirebaseFirestore.Timestamp
    }
]

/*
export interface Invoice {
  id: string;
  cartaoId: string;                 // referência ao cartão
  mesReferencia: string;            // ex: "2025-10"
  valorTotal: number;
  pago: boolean;
  dataCriacao: FirebaseFirestore.Timestamp;
}
*/
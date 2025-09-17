export const cartoes = [
    {
        id:"i3j32",
        idUser:"usuario1",
        nome:"dinheiro",
        categoria:"dinheiro",
        juros:0,
        createdAt:{dia:20,mes:2,ano:2020}, // criar no mesmo dia da criação da conta
        // não permitir exclusão desse "cartão".
    },
    {
        id:"33k4o",
        idUser:"usuario1",
        nome:"cartão para dívidas",
        categoria:"crédito",
        juros:0.1,
        createdAt:{dia:20,mes:2,ano:2020},
        faturas:["idFatura1", "idFatura2", "idFatura3"],
    },
    {
        id:"26f4b",
        idUser:"usuario1",
        nome:"cartão de compras",
        categoria:"débito",
        juros:0.1,
        createdAt:{dia:12,mes:5,ano:2022},
        saldo:1000
    },
]
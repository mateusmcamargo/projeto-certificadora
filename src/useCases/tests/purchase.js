import { addPurchases, getPurchases, updatePurchase, deletePurchase } from '../purchaseCRUD.js';

export async function testPurchaseCrud() {
  // Adicionar múltiplas compras
  await addPurchases([
    { userId: "usuario1", title: "Requeijão", category: "Laticínio", price: 20.99, qtd: 2, cartaoId: "card1", faturaId: "invoice1" },
    { userId: "usuario1", title: "Leite", category: "Laticínio", price: 5.5, qtd: 3, cartaoId: "card3" }
  ]);

  // Listar compras do usuário
  const compras = await getPurchases("usuario1", { category: "Laticínio" });
  console.log(compras);

  // Atualizar uma compra
  await updatePurchase("purchase1", { price: 21.50 });

  // Deletar uma compra
  await deletePurchase("purchase3");
}
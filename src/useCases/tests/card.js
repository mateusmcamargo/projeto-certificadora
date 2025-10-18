import { addCard, getCards, updateCard, deleteCard } from '../cardCRUD.js';

export async function testCardCRUD() {
  await addCard("usuario1", {
    nome: "Nubank",
    tipo: "crédito",
    limite: 5000,
    fechamentoDia: 5,
    vencimentoDia: 10
  });

  await addCard("usuario1", {
    nome: "Banco do Brasil Débito",
    tipo: "débito"
  });

  await addCard("usuario2", {
    nome: "Dinheiro",
    tipo: "dinheiro"
  });


  const cards = await getCards("usuario1");
  console.log(cards);

  await updateCard("usuario1", " 69cWaG2zKB91NIsUvmZL", { limite: 5500 });

  await deleteCard("usuario1", "card2");
}
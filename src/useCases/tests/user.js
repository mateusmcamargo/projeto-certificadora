import { saveUser, getUser, updateUser, deleteUser } from '../userCRUD.js';

export async function testUserCRUD() {
  await saveUser("usuario1", {
    nome: "Pedro Mendes",
    email: "pedro@email.com",
    fotoUrl: "https://example.com/foto1.jpg"
  });

  await saveUser("usuario2", {
    nome: "Maria Silva",
    email: "maria@email.com",
    fotoUrl: "https://example.com/foto2.jpg"
  });

  await saveUser("usuario3", {
    nome: "João Costa",
    email: "joao@email.com",
    fotoUrl: "https://example.com/foto3.jpg"
  });

  const user = await getUser("usuario1");
  console.log(user);

  await updateUser("usuario1", { nome: "Pedro M. Mendes" });
  await deleteUser("usuario3");
}
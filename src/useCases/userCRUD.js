import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config.js";
import { Timestamp } from "firebase/firestore";

// Criar ou atualizar usuário
export async function saveUser(userId, data) {
  await setDoc(doc(db, "users", userId), {
    ...data,
    dataCriacao: Timestamp.fromDate(new Date())
  });
}

// Ler usuário
export async function getUser(userId) {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? snap.data() : null;
}

// Atualizar usuário
export async function updateUser(userId, data) {
  await updateDoc(doc(db, "users", userId), data);
}

// Deletar usuário
export async function deleteUser(userId) {
  await deleteDoc(doc(db, "users", userId));
}
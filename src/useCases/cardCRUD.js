import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config.js";

export async function addCard(userId, cardData) {
  return await addDoc(collection(db, "users", userId, "cards"), cardData);
}

export async function getCards(userId) {
  const snap = await getDocs(collection(db, "users", userId, "cards"));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateCard(userId, cardId, data) {
  await updateDoc(doc(db, "users", userId, "cards", cardId), data);
}

export async function deleteCard(userId, cardId) {
  await deleteDoc(doc(db, "users", userId, "cards", cardId));
}
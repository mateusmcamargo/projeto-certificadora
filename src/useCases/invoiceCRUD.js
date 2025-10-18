import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config.js";

export async function addInvoice(userId, invoiceData) {
  return await addDoc(collection(db, "users", userId, "invoices"), invoiceData);
}

export async function getInvoices(userId) {
  const snap = await getDocs(collection(db, "users", userId, "invoices"));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateInvoice(userId, invoiceId, data) {
  await updateDoc(doc(db, "users", userId, "invoices", invoiceId), data);
}

export async function deleteInvoice(userId, invoiceId) {
  await deleteDoc(doc(db, "users", userId, "invoices", invoiceId));
}
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config.js";
import { Timestamp } from "firebase/firestore";

// Criar uma ou várias compras
export async function addPurchases(purchasesArray) {
  const promises = purchasesArray.map(item =>
    addDoc(collection(db, "purchases"), {
      ...item,
      criadoEm: Timestamp.fromDate(new Date()),
      data: item.data ? Timestamp.fromDate(new Date(item.data)) : Timestamp.fromDate(new Date())
    })
  );
  const docs = await Promise.all(promises);
  return docs.map(d => d.id);
}


// Listar compras do usuário com filtros
export async function getPurchases(userId, filters = {}) {
  let q = query(collection(db, "purchases"), where("userId", "==", userId));

  if (filters.category) q = query(q, where("category", "==", filters.category));
  if (filters.cartaoId) q = query(q, where("cartaoId", "==", filters.cartaoId));
  if (filters.startDate && filters.endDate) {
    q = query(
      q,
      where("data", ">=", Timestamp.fromDate(new Date(filters.startDate))),
      where("data", "<=", Timestamp.fromDate(new Date(filters.endDate)))
    );
  }

  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Atualizar compra
export async function updatePurchase(purchaseId, data) {
  const purchaseRef = doc(db, "purchases", purchaseId);
  if (data.data) {
    data.data = Timestamp.fromDate(new Date(data.data));
  }
  await updateDoc(purchaseRef, data);
}

// Deletar compra
export async function deletePurchase(purchaseId) {
  const purchaseRef = doc(db, "purchases", purchaseId);
  await deleteDoc(purchaseRef);
}
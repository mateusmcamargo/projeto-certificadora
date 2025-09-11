import React, { useState } from 'react'
import { PurchasesDraftProvider } from '../hooks/PurchasesDraftContext';
import { nanoid } from 'nanoid';

const PurchasesManagerDraftLogic = ({children}) => {
    const [purchasesList, setPurchasesList] = useState([
        { id:nanoid(), title: "Beterraba", category: "Alimento", price: 150.20 },
        { id:nanoid(), title: "Caixa de leite", category: "Laticínio", price: 150.40 }
    ]);
    const [selectedPurchases, setSelectedPurchases] = useState([]);
    const addPurchase = () => {setPurchasesList([{ id:nanoid(), title: "Nova Compra", category: "Categoria", price: 10 }, ...purchasesList]);}
    const addMultiplePurchases = ()=>{};
    const changePurchase = ()=>{};
    const deletePurchase = ()=>{};
    const save = ()=>{};

  return (
    <PurchasesDraftProvider value={{purchasesList, setPurchasesList, addPurchase, addMultiplePurchases, changePurchase, deletePurchase, selectedPurchases, setSelectedPurchases, save}}>
      {children}
    </PurchasesDraftProvider>
  );
}

export default PurchasesManagerDraftLogic
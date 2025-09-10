import React, { useState } from 'react'
import { PurchasesDraftProvider } from '../hooks/PurchasesDraftContext';

const PurchaseManagerLogic = ({children}) => {
    const [purchasesList, setPurchasesList] = useState([
        { title: "Beterraba", category: "Alimento", price: 150.20 },
        { title: "Caixa de leite", category: "Laticínio", price: 150.40 }
    ]);
    const addPurchase = () => {
        setPurchasesList([{ title: "Nova Compra", category: "Categoria", price: 0 }, ...purchasesList]);
    }
    const addMultiplePurchases = ()=>{};
    const changePurchase = ()=>{};
    const deletePurchase = ()=>{};
    const save = ()=>{};

  return (
    <PurchasesDraftProvider value={{purchasesList, setPurchasesList, addPurchase, addMultiplePurchases, changePurchase, deletePurchase, save}}>
      {children}
    </PurchasesDraftProvider>
  );
}

export default PurchaseManagerLogic
import React, { useState } from 'react'
import { PurchasesDraftProvider } from '../hooks/PurchasesDraftContext';
import { nanoid } from 'nanoid';
import { compras } from '../data/compras';

const PurchasesManagerDraftLogic = ({children}) => {
    const [purchasesList, setPurchasesList] = useState(compras);
    const [selectedPurchases, setSelectedPurchases] = useState([]);
    const [changesForm, setChangesForm] = useState({category:"", qtd:0, price:0})
    // devo corrigir a inserção de dados
    const addPurchase = () => {setPurchasesList((prevPurchasesList) => [{ id:nanoid(), title: "Carne moída 500 g", category: "carne", price: 10, qtd:1 }, ...prevPurchasesList]);}
    const addMultiplePurchases = ()=>{}
    const changePurchase = ()=>{}
    const deletePurchase = ()=>{}
    const deletePurchases = ()=>{
      setPurchasesList(purchasesList => purchasesList.filter(el => !selectedPurchases.some(({id})=> el.id==id)))
      setSelectedPurchases([])
    }
    const onChangesConfirm = () => {
      setPurchasesList (puchasesList => {
        return puchasesList.map((el) => {
          if(selectedPurchases.some(({id}) => el.id == id)) return {...el, ...changesForm}
          return el;
        })        
      });
      setSelectedPurchases([]);
    }
    const onChangesCancel = () => { setSelectedPurchases([]); }

    const [selectedCardId, setSelectedCardId] = useState("");

    const handleCardSelection = (cardId) => {
      console.log(cardId);
      setSelectedCardId(cardId);
    }

    // authorize é somente para permitir agrupamento ou não, não sendo uma propriedade da entidade no banco.
    const [group, setGroup] = useState({id:nanoid(), authorize:true, idUser:"usuario1", name:"", createdAt:{dia:16,mes:9,ano:2025}});

    const save = ()=>{
      
    }

  return (
    <PurchasesDraftProvider value={{
      purchasesList,
      setPurchasesList,
      addPurchase,
      addMultiplePurchases,
      changePurchase,
      deletePurchase,
      deletePurchases,
      selectedPurchases,
      setSelectedPurchases,
      changesForm,
      setChangesForm,
      onChangesConfirm,
      onChangesCancel,
      selectedCardId,
      handleCardSelection,
      group,
      setGroup,
      save
    }}>
      {children}
    </PurchasesDraftProvider>
  );
}

export default PurchasesManagerDraftLogic
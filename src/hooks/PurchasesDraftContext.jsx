import { createContext, useContext } from "react";

export const PurchasesDraftContext = createContext({
    purchasesList:[],
    setPurchasesList:()=>{},
    addPurchase:()=>{},
    addMultiplePurchases:()=>{},
    changePurchase:()=>{},
    deletePurchase:()=>{},
    save:()=>{}
});

export const usePurchasesDraftContext = () => {
    const res = useContext(PurchasesDraftContext)
    return res;
}

export const PurchasesDraftProvider = ({children, value}) => {
    return (
        <PurchasesDraftContext.Provider value={value}>
            {children}
        </PurchasesDraftContext.Provider>
    )
}
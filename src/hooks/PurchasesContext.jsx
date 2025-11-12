import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase-config";

const PurchasesContext = createContext({
  purchasesList: [],
  setPurchasesList: () => {},
});

export const PurchasesProvider = ({ children, value }) => {
  const { authData } = useAuth();
  const [purchasesList, setPurchasesList] = useState([]);

    useEffect(() => {
        (async () => {
            const purchasesRef = collection(db, "purchases");        
            if(!authData.user) return;
            try{
                getDocs(query(purchasesRef, where("userId", "==", authData.user.email))).then((snapshot) => {
                    setPurchasesList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                })
            } catch (e){
                console.log("deu erro", e);
            }
        })();
    }, [authData])

  return (
    <PurchasesContext.Provider value={{ purchasesList, setPurchasesList, ...value }}>
      {children}
    </PurchasesContext.Provider>
  );
};

export const usePurchasesContext = () => useContext(PurchasesContext);
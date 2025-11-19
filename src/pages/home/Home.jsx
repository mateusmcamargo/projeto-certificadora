import { useEffect, useState } from 'react'

import {
  PurchasesManagerDraftLogic,
  Invoice,
  NewPurchase,
  ExpensesCard,
  PurchasesList
} from '../../components/Components';


import PurchasesManagerDialog from '../../components/ui/PurchasesManagerDialog'
import PizzaChart from '../../components/ui/PizzaChart'
import { usePurchasesContext } from '../../hooks/PurchasesContext'
import { useProfileContext } from '../../hooks/ProfileContext'
import { getPurchases } from '../../useCases/purchaseCRUD'
import { calcTotalExpenses } from '../../utils/calcTotalExpenses'
import Font from '../../components/font/Font'

// components
import { CardFilterSection } from '../../components/Components'; 

const Home = () => {

    const {purchasesList, setPurchasesList} = usePurchasesContext();
    const [cardFilter, setCardFilter] = useState('');
    const {profile} = useProfileContext();

    useEffect(() => {
        (async () => {
            getPurchases(profile.email, {cartaoId:cardFilter}).then((data) => {
                setPurchasesList(data || []);
            });
        })();
    }, [cardFilter]);

    const totalExpenses   = calcTotalExpenses(purchasesList);
    const categoriesCount = new Set(purchasesList.map(c => c.category)).size;
    const totalDeposits   = profile.deposits.reduce((acc,c) => +acc+(+c.value), 0)

    return (
        <div style={{marginBlock:"2rem 10rem"}}>
            <section className="purchase-manager-with-webscraping">
                <div style={{display:'flex', flexDirection:"column", alignItems:'center', flexWrap:"wrap", gap:'1rem'}}>
                    <Font.Title>Aplicar filtro de cartões</Font.Title>
                    { profile && <CardFilterSection {...{profile, cardFilter, setCardFilter}}/>}
                </div>
                <div style={{display:'flex', gap:'1rem', flexWrap:'wrap', justifyContent:"center", marginTop:'1rem'}}>
                    <ExpensesCard title={"Total gasto este mês"} icon={"↗"} description={`Distribuído em ${categoriesCount} categorias`} value={totalExpenses}/>
                    <ExpensesCard title={"Total recebido"} icon={"🛒"} description={"valor correspondente a todos os depósitos"} value={totalDeposits}/>
                </div>
                <div style={{display:'flex', gap:'2rem', marginTop:'2rem', flexWrap:'wrap', alignItems:"flex-start", justifyContent:"center"}}>
                        <PizzaChart props={{purchasesList}}/>
                        <div>
                            <Font.Subtitle>Lista de compras já registradas</Font.Subtitle>
                            <div style={{marginBottom:"2rem"}}></div>
                            <PurchasesList/>                    
                        </div>
                </div>                    
                    <div style={{display:'flex', alignItems:"flex-start", flexWrap:"wrap", justifyContent:'center'}}>
                        <PurchasesManagerDraftLogic>
                            <Invoice/>
                            <NewPurchase/>
                            <PurchasesManagerDialog/>
                        </PurchasesManagerDraftLogic>
                    </div>
            </section>
        </div>  
    )
}

export default Home
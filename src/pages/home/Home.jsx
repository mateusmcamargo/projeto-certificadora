import { useEffect, useState } from 'react'

import {
  PurchasesManagerDraftLogic,
  Invoice,
  NewPurchase,
  ExpensesCard,
  PurchasesFilter
} from '../../components/Components';


import PurchasesManagerDialog from '../../components/ui/PurchasesManagerDialog'
import { usePurchasesContext } from '../../hooks/PurchasesContext'
import { useProfileContext } from '../../hooks/ProfileContext'
import { getPurchases } from '../../useCases/purchaseCRUD'
import { calcTotalExpenses } from '../../utils/calcTotalExpenses'

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
        <main>
            <ExpensesCard
                title={"Total gasto este mês"}
                icon={'fa-solid fa-dollar-sign'} 
                description={`Distribuído em ${categoriesCount} categorias`} 
                value={totalExpenses}
            />
            <ExpensesCard
                title={"Total recebido"}
                icon={'fa-solid fa-money-bill-trend-up'} 
                description={"Valor de todos os depósitos"}
                value={totalDeposits}
            />

            {profile && <PurchasesFilter {...{profile}}/>}

            <PurchasesManagerDraftLogic>
                <Invoice/>
                <NewPurchase/>
                <PurchasesManagerDialog/>
            </PurchasesManagerDraftLogic>
        </main>  
    )
}

export default Home
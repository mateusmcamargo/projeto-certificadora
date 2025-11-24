import { useEffect, useState } from 'react'

import {
  PurchasesFilter
} from '../../components/Components';

import { usePurchasesContext } from '../../hooks/PurchasesContext'
import { useProfileContext } from '../../hooks/ProfileContext'
import { getPurchases } from '../../useCases/purchaseCRUD'

export function Charts() {

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

    return (
        <main>
            {profile && <PurchasesFilter {...{profile}}/>}
        </main>  
    );
}
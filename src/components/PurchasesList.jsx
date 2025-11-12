import React from 'react'
import { usePurchasesContext } from '../hooks/PurchasesContext';
import { nanoid } from 'nanoid';
import Purchase from './Purchase';

const PurchasesList = () => {
    const {purchasesList} = usePurchasesContext();
    return (
        <div>
            <ul style={{width:'300px', maxHeight:'300px', overflowY:'auto', padding:'0', margin:'0', listStyle:'none'}}>
                {
                    purchasesList && purchasesList.map((purchase) => (
                        <li key={nanoid()}>
                            <Purchase {...purchase}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default PurchasesList
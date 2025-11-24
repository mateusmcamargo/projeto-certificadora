import { usePurchasesContext } from '../hooks/PurchasesContext';
import { nanoid } from 'nanoid';
import { Purchase } from "./Components"

export function PurchasesList() {
    const {purchasesList} = usePurchasesContext();
    return (
        <div>
            <ul className='purchases-list'>
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
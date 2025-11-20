import './expensesCard.css';

import { usePurchasesContext } from '../../hooks/PurchasesContext';

export function ExpensesCard({title, value, icon, description}) {
    const {purchasesList} = usePurchasesContext();
    if(!purchasesList) return <></>;
    return (
        <div className='expenses-card'>
            <div className='header'>
                <span className='title'>{title}</span>
                <i className={`icon ${icon}`}></i>
            </div>
            <h2 className='value'>
                R${value.toLocaleString('pt-BR', {maximumFractionDigits: 2})}
            </h2>
            <span className='description'>
                {description}
            </span>
        </div>
    );
}
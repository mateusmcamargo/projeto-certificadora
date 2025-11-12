import React from 'react'
import { usePurchasesContext } from '../hooks/PurchasesContext';

const ExpensesCard = ({title, value, icon, description}) => {
    const {purchasesList} = usePurchasesContext();
    if(!purchasesList) return <></>;
    return (
        <div style={{background: "linear-gradient(to right, #ffffff, #f8f9fa)",borderRadius: "12px",padding: "16px 20px",boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",width: "250px",fontFamily: "Arial, sans-serif",}}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6b7280", fontSize: "14px" }}>{title}</span>
                <span style={{ color: "#ff9800", fontSize: "18px" }}>{icon}</span>
            </div>
            <h2 style={{ color: "#ff6f00", fontSize: "26px", margin: "8px 0 4px" }}>
                R$ {value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
            </h2>
            <span style={{ color: "#9ca3af", fontSize: "13px" }}>
                {description}
            </span>
        </div>
    )
}

export default ExpensesCard
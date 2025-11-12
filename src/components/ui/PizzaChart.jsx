import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { usePurchasesContext } from "../../hooks/PurchasesContext";

 const cardStyle = {
    maxWidth: "350px",
    margin: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "16px",
    fontFamily: "sans-serif",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "4px",
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  };

  const COLORS = [
    "#f59e0b", // amarelo
    "#ef4444",       // vermelho
    "#3b82f6",  // azul
    "#22c55e",  // verde
    "#a855f7",      // roxo
    "#f97316", // laranja
    "#06b6d4", // ciano
    "#8b5cf6", // violeta
    "#ec4899", // rosa
    "#10b981", // esmeralda
  ];

  
const PizzaChart = () => {
    const {purchasesList} = usePurchasesContext();
    const [data, setData] = useState([]);

    useEffect(() => {
        if(!purchasesList) return;
        setData(Object.values(
            purchasesList.reduce((acc, { category, price, qtd = 1 }) => {
                acc[category] = acc[category] || { category, value: 0 };
                acc[category].value += price * qtd;
                return acc;
            }, {})
        ));
    }, [purchasesList])

    return (
        <div style={cardStyle}>
            <h2 style={titleStyle}>Gastos por Categoria</h2>
            <p style={subtitleStyle}>Distribuição dos gastos deste mês</p>
            <div style={{ width: "100%", height: "220px" }}>
                <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="category" innerRadius={60} outerRadius={80} paddingAngle={3}>
                        {data.map((entry, i) => ( <Cell key={i} fill={COLORS[i] || "#9ca3af"}/> ))}
                    </Pie>
                    <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} contentStyle={{ borderRadius: "8px", borderColor: "#e5e7eb", fontSize: "14px"}}/>
                    <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={10} wrapperStyle={{fontSize: "13px", marginTop: "10px"}}/>
                </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PizzaChart;
import Font from "../font/Font";
import { CardFilterSection, PurchasesList } from "../Components";
import PizzaChart from "../ui/PizzaChart";
import "./PurchasesFilter.scss";

export function PurchasesFilter({ profile, cardFilter, setCardFilter, purchasesList }) {
    return (
        <div className="block purchases-filter">

            <div className="header">
                <Font.Title>Aplicar filtro de cartões</Font.Title>
                {profile && (
                    <CardFilterSection {...{ profile, cardFilter, setCardFilter }} />
                )}
            </div>

            <div className="content">
                <PizzaChart props={purchasesList}/>

                <div className="list-section">
                    <Font.Subtitle>Lista de compras já registradas</Font.Subtitle>
                    <PurchasesList/>
                </div>
            </div>

        </div>
    );
}

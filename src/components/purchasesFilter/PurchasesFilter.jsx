import Font from "../font/Font";
import { PurchasesList } from "../Components";
import PizzaChart from "../ui/PizzaChart";
import "./PurchasesFilter.scss";
import { useEffect, useState } from "react";
import { usePurchasesContext } from "../../hooks/PurchasesContext";
import { getPurchases } from "../../useCases/purchaseCRUD";
import { useAuth } from "../../hooks/AuthContext";
import { Button } from "../ui/Ui";
import { useProfileContext } from "../../hooks/ProfileContext";

export function PurchasesFilter() {

    const [cardSelected, setCardSelected] = useState("");
    const {purchasesList, setPurchasesList} = usePurchasesContext();
    const {authData:{user}} = useAuth();
    const {profile} = useProfileContext();

    useEffect(() => {        
        (async () => {
            const compras = await getPurchases(user.email, cardSelected == "" ? {} : {cartaoId:cardSelected});
            setPurchasesList(compras);            
        })()
    }, [cardSelected])

    return (
        <div className="block purchases-filter">
            <div className="header">
                <Font.Title>Aplicar filtro de cartões</Font.Title>
                <ul className='filter-list'>
                    <li>
                        <Button.Option
                            selected={cardSelected == ""}
                            onClick={() => setCardSelected("")}
                        >
                            Nenhum</Button.Option>
                    </li>
                    {profile.cards.map((c) => (
                        <li key={c.id}>
                            <Button.Option selected={cardSelected == c.id}
                                onClick={() => setCardSelected(c.id)}>{c.title}
                            </Button.Option>
                        </li>
                    ))}
                </ul>
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

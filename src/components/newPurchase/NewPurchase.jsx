// style
import './newPurchase.css';

// components
import { Button }   from '../ui/Ui';
import { Purchase } from "../Components"
import Font     from '../font/Font';

// hooks
import { usePurchasesDraftContext } from '../../hooks/PurchasesDraftContext';
import { useProfileContext } from '../../hooks/ProfileContext';

// react
import { useCallback, useMemo } from 'react';

export function NewPurchase() {
    const {
        purchasesList,
        setPurchasesList,
        addPurchase,
        selectedPurchases,
        setSelectedPurchases,
        selectedCardId,
        handleCardSelection,
        save
    } = usePurchasesDraftContext();

    const onSelect = (id, selected) => {
        if (selected) setSelectedPurchases([...selectedPurchases, purchasesList.find(item => item.id === id)]);
        else setSelectedPurchases(selectedPurchases.filter(item => item.id !== id));
    };

    const onClose = useCallback((id) => {
        setPurchasesList(purchasesList.filter(item => item.id !== id));
        setSelectedPurchases(selectedPurchases.filter(item => item.id !== id));
    }, [purchasesList, selectedPurchases]);
    
    const renderPurchases = () => purchasesList.map((props) => (
        <li key={props.id}>
            <Purchase 
                onClose={() => onClose(props.id)}
                onSelect={(selected) => onSelect(props.id,selected)}
                {...props}
                selected={selectedPurchases.some(el => el.id == props.id)}
            />
        </li>
    ))

    const renderCards = () => {
        const {profile} = useProfileContext();
        return profile.cards.map((c) => (
        <li key={c.id}>
            <Button.Option selected={c.id==selectedCardId} onClick={()=>handleCardSelection(c.id)}>{c.title}</Button.Option>
        </li>
        ))
    }

    const total = useMemo(() => purchasesList.reduce((acc, cv) => (cv.price*cv.qtd + acc),0).toFixed(2), [purchasesList]);
    
    return (
        <div className="block new-purchase">
            <Font.Title>Adicionar Compras</Font.Title>

            <div className="add-row">
                <Button.Add onClick={addPurchase}>
                    <i className='fa-solid fa-plus'></i>
                    NOVA COMPRA
                </Button.Add>
            </div>

            <ul className="purchases-list">
                {renderPurchases()}
            </ul>

            <div className="summary-block">
                <h3>Total: R${total}</h3>

                <div className="card-selector">
                    <Font.Subtitle>Cartão:</Font.Subtitle>
                    <ul>
                        {renderCards()}
                    </ul>
                </div>

                <div className="action-buttons">
                    <Button.Cancel>
                        <i className='fa-solid fa-xmark'></i>
                        CANCELAR
                    </Button.Cancel>

                    <Button.Submit onClick={save}>
                        <i className='fa-solid fa-floppy-disk'></i>
                        SALVAR
                    </Button.Submit>
                </div>
            </div>
        </div>
    );
}
import { Button } from '../ui/Ui';
import { usePurchasesDraftContext } from '../../hooks/PurchasesDraftContext';
import { Purchase } from "../Components"
import { useCallback, useMemo } from 'react';
import Subtitle from '../font/Subtitle';
import { useProfileContext } from '../../hooks/ProfileContext';

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
        <div style={{padding:"1rem"}}>
            <Subtitle>Rascunho de compras</Subtitle>
            <div style={{marginBottom:"1rem"}}></div>
            <div style={{display:"flex", justifyContent:"flex-end", marginBottom:".5rem"}}>
                <Button.Add
                    onClick={addPurchase}
                    style={{width:"max-content"}}
                >
                    <i className='fa-solid fa-plus'></i>
                    Adicionar
                </Button.Add>
            </div>
            <ul style={{display:'flex', flexDirection:'column', gap:'.25rem', maxHeight:400, overflowY:"auto", boxSizing:"content-box", scrollbarWidth:"thin"}}>
                {renderPurchases()}
            </ul>
            <div style={{display:"flex", flexDirection:"column", marginTop:"2rem", gap:"1rem"}}>
                <h3>Total: R$ {total}</h3>
                <div style={{display:"flex", flexDirection:"column", gap:".5rem", paddingBottom:"1rem", borderBottom:"2px solid var(--border-color)"}}>
                    <Subtitle>Cartão:</Subtitle>
                    <ul style={{listStyle:"none", display:'flex', flexWrap:'wrap', gap:".5rem"}}>
                        {renderCards()}
                    </ul>
                </div>
                <div style={{display:"flex", gap:".25rem"}}>
                    
                    <Button.Cancel
                        style={{flexShrink:2}}
                    >
                        <i className='fa-solid fa-xmark'></i>
                        Cancelar
                    </Button.Cancel>

                    <Button.Submit
                        onClick={save}
                        style={{flexShirnk:1}}
                    >
                        <i className='fa-solid fa-floppy-disk'></i>
                        Salvar
                    </Button.Submit>
                </div>
            </div>
        </div>
    )
}
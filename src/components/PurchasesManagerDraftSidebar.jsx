import Button from './ui/Button'
import Label from './ui/Label'
import { usePurchasesDraftContext } from '../hooks/PurchasesDraftContext';
import Purchase from './Purchase';
import Input from './ui/Input';
import { useCallback, useMemo } from 'react';
import Subtitle from './font/Subtitle';
import { cartoes } from '../data/cartoes'
import Text from "./font/Text"

const PurchasesManagerDraftSidebar = () => {
    const {
        purchasesList,
        setPurchasesList,
        addPurchase,
        selectedPurchases,
        setSelectedPurchases,
        selectedCardId,
        handleCardSelection,
        group,
        setGroup,
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

    const renderCards = () => cartoes.map((c) => (
        <li key={c.id}>
            <Button.Option selected={c.id==selectedCardId} onClick={()=>handleCardSelection(c.id)}>{c.nome}</Button.Option>
        </li>
    ))

    const total = useMemo(() => purchasesList.reduce((acc, cv) => (cv.price*cv.qtd + acc),0).toFixed(2), [purchasesList]);
    
    return (
        <div style={{padding:"1rem"}}>
            <div style={{display:"flex", justifyContent:"flex-end", marginBottom:".5rem"}}>
                <Button.Default onClick={addPurchase} style={{width:"max-content", fontSize:".875rem"}}>+ Adicionar</Button.Default>
            </div>
            <ul style={{display:'flex', flexDirection:'column', gap:'.25rem', maxHeight:400, overflowY:"auto", boxSizing:"content-box", scrollbarWidth:"thin"}}>
                {renderPurchases()}
            </ul>
            <div style={{display:"flex", flexDirection:"column", marginTop:"2rem", gap:"1rem"}}>
                <h3>Total: R$ {total}</h3>
                <div style={{display:"flex", gap:".25rem"}}>
                    <Button.Option 
                        selected={group.authorize}
                        onClick={()=>{setGroup(el => ({...el, authorize:true}))}}
                    >Agrupar</Button.Option>
                    <Button.Option 
                        selected={!group.authorize}
                        onClick={()=>{setGroup(el => ({...el, authorize:false}))}}
                    >Não agrupar</Button.Option>
                </div>
                {
                    group.authorize &&
                    <div style={{display:"flex", flexDirection:"column", gap:".5rem", paddingBottom:"1rem", borderBottom:"2px solid var(--border-color)"}}>
                        <Label>
                            Nome do bloco de compras:
                            <Input placeholder='Ex: Supermercado XYZ'/>
                        </Label>
                    </div>
                }
                <div style={{display:"flex", flexDirection:"column", gap:".5rem", paddingBottom:"1rem", borderBottom:"2px solid var(--border-color)"}}>
                    <Label>
                        Data das compras:
                        <Input placeholder='Ex: Supermercado XYZ'/>
                    </Label>
                </div>
                <div style={{display:"flex", flexDirection:"column", gap:".5rem", paddingBottom:"1rem", borderBottom:"2px solid var(--border-color)"}}>
                    <Subtitle>Cartão:</Subtitle>
                    <ul style={{listStyle:"none", display:'flex', flexWrap:'wrap', gap:".5rem"}}>
                        {renderCards()}
                    </ul>
                </div>
                <div style={{display:"flex", gap:".25rem"}}>
                    <Button.Cancel style={{flexShrink:2}}>Cancelar</Button.Cancel>
                    <Button.Submit style={{ flexShirnk:1}}>Salvar</Button.Submit>
                </div>
            </div>
        </div>
    )
}

export default PurchasesManagerDraftSidebar
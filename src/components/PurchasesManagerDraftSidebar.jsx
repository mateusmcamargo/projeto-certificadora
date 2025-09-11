import Button from './ui/Button'
import Label from './ui/Label'
import { usePurchasesDraftContext } from '../hooks/PurchasesDraftContext';
import Purchase from './Purchase';
import Input from './ui/Input';
import { useCallback } from 'react';

const PurchasesManagerDraftSidebar = () => {
    const {purchasesList, setPurchasesList, addPurchase, selectedPurchases, setSelectedPurchases} = usePurchasesDraftContext();

    const onSelect = (id, checked) => {
        if (checked) setSelectedPurchases([...selectedPurchases, purchasesList.find(item => item.id === id)]);
        else setSelectedPurchases(selectedPurchases.filter(item => item.id !== id));
    };

    const onClose = useCallback((id) => {
        setPurchasesList(purchasesList.filter(item => item.id !== id));
        setSelectedPurchases(selectedPurchases.filter(item => item.id !== id));
    }, [purchasesList, selectedPurchases]);
    
    const renderPurchases = () => purchasesList.map(({id, title, category,price}) => (
        <li key={id}><Purchase onClose={() => onClose(id)} onSelect={(checked) => onSelect(id,checked)} title={title} category={category} price={price}/></li>
    ))
    
    
    return (
        <div>
            <div style={{display:"flex", justifyContent:"flex-end", marginBottom:".5rem"}}>
                <Button.Default onClick={addPurchase} style={{width:"max-content", fontSize:".875rem"}}>+ Adicionar</Button.Default>
            </div>
            <ul style={{display:'flex', flexDirection:'column', gap:'.25rem'}}>
                { renderPurchases() }
            </ul>
            <div style={{display:"flex", flexDirection:"column", marginTop:"2rem", gap:"1rem"}}>
                <h3>Total: R$ {purchasesList.reduce((acc, cv) => (cv.price + acc),0).toFixed(2)}</h3>
                <div style={{display:"flex", gap:".25rem"}}>
                    <Button.Option selected={true}>Agrupar</Button.Option>
                    <Button.Option>Não agrupar</Button.Option>
                </div>
                <div style={{display:"flex", flexDirection:"column", gap:".5rem", paddingBottom:"1rem", borderBottom:"2px solid var(--border-color)"}}>
                    <Label>
                        Nome do bloco de compras:
                        <Input placeholder='Ex: Supermercado XYZ'/>
                    </Label>
                    <Label>
                        Data:
                        <Input placeholder='Ex: Supermercado XYZ'/>
                    </Label>
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
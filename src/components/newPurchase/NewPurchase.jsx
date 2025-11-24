// NewPurchase.jsx

// style
import './newPurchase.css';

// components
import { Button, Input, Label } from '../ui/Ui'; 
import Font from '../font/Font';

// hooks
import { usePurchasesDraftContext } from '../../hooks/PurchasesDraftContext';
import { useProfileContext } from '../../hooks/ProfileContext';

// react
import { useCallback, useMemo, useState } from 'react';

const initialPurchaseDataState = {
    id: '',
    name: '',
    price: '',
    qtd: ''
};

export function NewPurchase({type}) {
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

    const [selectedPurchaseId, setSelectedPurchaseId] = useState('');
    const [purchaseData, setPurchaseData] = useState(initialPurchaseDataState);

    const onSelect = (id, selected) => {
        if (selected) setSelectedPurchases([...selectedPurchases, purchasesList.find(item => item.id === id)]);
        else setSelectedPurchases(selectedPurchases.filter(item => item.id !== id));
    };

    const onClose = useCallback((id) => {
        setPurchasesList(purchasesList.filter(item => item.id !== id));
        setSelectedPurchases(selectedPurchases.filter(item => item.id !== id));
        if (selectedPurchaseId === id) {
            setSelectedPurchaseId('');
            setPurchaseData(initialPurchaseDataState);
        }
    }, [purchasesList, selectedPurchases, setPurchasesList, setSelectedPurchases, selectedPurchaseId]);
    
    const handleEditPurchase = (id) => {
        const updatedPurchase = purchaseData;
        
        if (!updatedPurchase.name || parseFloat(updatedPurchase.price) <= 0 || parseFloat(updatedPurchase.qtd) <= 0) {
            alert("Nome, preço e quantidade devem ser válidos.");
            return;
        }

        setPurchasesList(prevList => prevList.map(item => 
            item.id === id ? updatedPurchase : item
        ));

        setSelectedPurchases(prevSelected => prevSelected.map(item => 
            item.id === id ? updatedPurchase : item
        ));

        setSelectedPurchaseId('');
        setPurchaseData(initialPurchaseDataState);
    };

    /**
     * Handles canceling the edit, and automatically removes the purchase
     * if it was a newly added, empty item being edited.
     */
    const handleCancelEdit = () => {
        // If we are currently editing an item (selectedPurchaseId is set), remove it via onClose
        if (selectedPurchaseId) {
            onClose(selectedPurchaseId);
        }
        setSelectedPurchaseId('');
        setPurchaseData(initialPurchaseDataState);
    };
    
    /**
     * ✅ NEW PURCHASE LOGIC: Calls addPurchase and immediately opens the edit form for the new item.
     */
    const handleAddAndEdit = () => {
        // Assuming addPurchase returns the newly created purchase object {id, name, price, qtd}
        const newPurchase = addPurchase(); 

        if (newPurchase) {
            // Set the local state to open the edit form for this new purchase
            setSelectedPurchaseId(newPurchase.id);
            setPurchaseData({
                id: newPurchase.id,
                name: newPurchase.name,
                price: newPurchase.price,
                qtd: newPurchase.qtd
            });
        }
    };

    const renderPurchaseEditForm = (id) => {
        if (selectedPurchaseId !== id) return null;

        return (
            <div role='edit purchase' className='edit-purchase'>
                <div className='input-block'>
                    <Label>Nome</Label>
                    <Input
                        type='text'
                        value={purchaseData.name}
                        placeholder='Arroz'
                        onChange={(e) => setPurchaseData(p => ({ ...p, name: e.target.value }))}
                    />
                </div>
                <div className='input-block'>
                    <Label>Categoria</Label>
                    <Input
                        type='text'
                        placeholder='Mercado'
                        value={purchaseData.category}
                        onChange={(e) => setPurchaseData(p => ({ ...p, category: e.target.value }))}
                    />
                </div>
                <div className='input-row'>
                    <div className='input-block'>
                        <Label>Preço (R$)</Label>
                        <Input
                            type='number'
                            step='0.01'
                            value={purchaseData.price}
                            onChange={(e) => setPurchaseData(p => ({ ...p, price: e.target.value }))}
                        />
                    </div>
                    <div className='input-block'>
                        <Label>Quantidade</Label>
                        <Input
                            type='number'
                            step='1'
                            value={purchaseData.qtd}
                            onChange={(e) => setPurchaseData(p => ({ ...p, qtd: e.target.value }))}
                        />
                    </div>
                </div>

                <div className='buttons'>
                    <Button.Cancel onClick={handleCancelEdit}>
                        <i className='fa-solid fa-xmark'></i>
                        Cancelar
                    </Button.Cancel>

                    <Button.Add onClick={() => handleEditPurchase(id)}>
                        <i className='fa-solid fa-floppy-disk'></i>
                        Salvar
                    </Button.Add>
                </div>
            </div>
        );
    };

    const renderPurchases = () => purchasesList.map((p) => {
        const isSelected = selectedPurchases.some(el => el.id === p.id);
        const totalValue = (parseFloat(p.price || 0) * parseFloat(p.qtd || 0)).toFixed(2);
        const isEditing = selectedPurchaseId === p.id;

        return (
            <li key={p.id} className={isSelected ? 'selected' : ''}>
                <div className='purchase-item-content'>
                    
                    <div className='header'>
                        <div className='info'>
                            <p className='name'>{p.name || (isEditing ? 'Nova Compra' : 'Item Sem Nome')}</p> 
                            <span className='details'>
                                R${p.price} x {p.qtd} un.
                            </span>
                        </div>
                        <div className='actions'>
                            
                            {/* Only show Edit/Delete if NOT currently editing this item */}
                            {!isEditing && (
                                <>
                                    <i 
                                        className='fa-solid fa-pen-to-square edit'
                                        onClick={() => {
                                            setSelectedPurchaseId(p.id);
                                            setPurchaseData({
                                                id: p.id,
                                                name: p.name,
                                                price: p.price,
                                                qtd: p.qtd
                                            });
                                        }}
                                    >
                                        <span>Editar</span>
                                    </i>

                                    <i 
                                        className='fa-solid fa-xmark delete'
                                        onClick={() => onClose(p.id)}
                                    ></i>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Conditional Edit Form: Only renders if selectedPurchaseId === p.id */}
                    {isEditing && renderPurchaseEditForm(p.id)}

                    <div className='purchase-total'>
                        <Font.Subtitle>Total:</Font.Subtitle>
                        <p>R${totalValue}</p>
                    </div>

                </div>
            </li>
        );
    });

    const renderCards = () => {
        const { profile } = useProfileContext();
        if (!profile || !profile.cards) return null;
        
        return profile.cards.map((c) => (
            <li key={c.id}>
                <Button.Option 
                    selected={c.id === selectedCardId} 
                    onClick={() => handleCardSelection(c.id)}
                >
                    {c.name}
                </Button.Option>
            </li>
        ));
    };

    const total = useMemo(() => purchasesList.reduce((acc, cv) => {
        const price = parseFloat(cv.price) || 0;
        const qtd = parseFloat(cv.qtd) || 0;
        return (price * qtd) + acc;
    }, 0).toFixed(2), [purchasesList]);
    
    return (
        <div className={`${type === 'create' ? 'section' : 'block'} new-purchase`}>

            {/* ✅ CORRECT USAGE: Clicking this button runs handleAddAndEdit, which opens the form */}
            <Button.Add onClick={handleAddAndEdit}>
                <i className='fa-solid fa-plus'></i>
                NOVA COMPRA
            </Button.Add>

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
                    <Button.Submit onClick={save}>
                        <i className='fa-solid fa-floppy-disk'></i>
                        SALVAR
                    </Button.Submit>
                </div>
            </div>
        </div>
    );
}
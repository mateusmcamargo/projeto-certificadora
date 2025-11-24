// style
import './create.css';

// react
import { useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom'; 

// components
import Font from '../../components/font/Font';
import { Button, Input, Label } from '../../components/ui/Ui';
import { Purchase } from "../../components/Components";

// hooks
import { useProfileContext } from '../../hooks/ProfileContext';
import { useAuth } from '../../hooks/AuthContext';
import { usePurchasesDraftContext } from '../../hooks/PurchasesDraftContext';

// use cases
import { updateUser } from '../../useCases/userCRUD';

const initialDepositState = {
    id: '',
    value: '',
    name: ''
};

const initialCardState = {
    id: '',
    title: '',
    name: '',
    number: '',
    brand: '',
    bank: '',
    date: ''
};

const CARD_COLORS = [
    'linear-gradient(135deg, #e435ff, #650771)',
    'linear-gradient(135deg, #ff4e50, #bb1719)',
    'linear-gradient(135deg, #516bef, #223ab2)',
    'linear-gradient(135deg, #25dd50, #28a746)',
    'linear-gradient(135deg, #29d7f2, #0699af)'
];

function randomGradient() {
    const randomIndex = Math.floor(Math.random() * CARD_COLORS.length);
    return CARD_COLORS[randomIndex];
};

export function Create() {
    const navigate = useNavigate();
    const { authData } = useAuth();
    const { profile, setProfile } = useProfileContext();

    const [deposit, setDeposit] = useState(initialDepositState);
    const [card, setCard] = useState(initialCardState);

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

    const handleAddDeposit = async () => {
        const { name: newDepositName, value: newDepositValue } = deposit;

        // Validation
        if (!newDepositName || !newDepositValue) {
            alert("Nome e valor do depósito são obrigatórios.");
            return;
        }
        
        const numericValue = parseFloat(newDepositValue);
        if (isNaN(numericValue) || numericValue <= 0) {
            alert("O valor do depósito deve ser um número positivo.");
            return;
        }

        if (!profile || !authData?.user?.email) {
            console.error("Profile data not loaded or user not authenticated.");
            return;
        }

        const newDeposit = {
            id: nanoid(),
            name: newDepositName,
            value: newDepositValue,
        };

        const updatedProfile = {
            ...profile,
            deposits: [...(profile.deposits || []), newDeposit]
        };

        await updateUser(authData.user.email, updatedProfile);
        setProfile(updatedProfile);
        setDeposit(initialDepositState);
        alert(`Depósito '${newDepositName}' adicionado com sucesso!`);
    };

    const handleAddCard = async () => {
        const { bank, brand, date, name, number, title } = card;

        if (!title || !name || !number || !bank || !brand || !date) {
            alert("Preencha todos os campos do cartão.");
            return;
        }

        if (!profile || !authData?.user?.email) {
            console.error("Profile data not loaded or user not authenticated.");
            return;
        }

        const newCard = {
            id: nanoid(),
            bank,
            brand,
            color: randomGradient(),
            date,
            name,
            number,
            title
        };

        const updatedProfile = {
            ...profile,
            cards: [...(profile.cards || []), newCard]
        };

        await updateUser(authData.user.email, updatedProfile);
        setProfile(updatedProfile);
        setCard(initialCardState);
        alert(`Cartão '${title}' adicionado com sucesso!`);
    };

    const onSelect = (id, selected) => {
        if (selected) setSelectedPurchases([...selectedPurchases, purchasesList.find(item => item.id === id)]);
        else setSelectedPurchases(selectedPurchases.filter(item => item.id !== id));
    };

    const onClose = useCallback((id) => {
        setPurchasesList(purchasesList.filter(item => item.id !== id));
        setSelectedPurchases(selectedPurchases.filter(item => item.id !== id));
    }, [purchasesList, selectedPurchases, setPurchasesList, setSelectedPurchases]);
    
    const renderPurchases = () => purchasesList.map((props) => (
        <li key={props.id}>
            <Purchase 
                onClose={() => onClose(props.id)}
                onSelect={(selected) => onSelect(props.id,selected)}
                {...props}
                selected={selectedPurchases.some(el => el.id === props.id)}
            />
        </li>
    ))

    const renderCards = () => {
        return profile?.cards?.map((c) => (
            <li key={c.id}>
                <Button.Option selected={c.id === selectedCardId} onClick={() => handleCardSelection(c.id)}>{c.title}</Button.Option>
            </li>
        )) || null;
    }

    const total = useMemo(() => purchasesList.reduce((acc, cv) => (parseFloat(cv.price || 0) * parseFloat(cv.qtd || 0) + acc), 0).toFixed(2), [purchasesList]);

    if (!profile) {
        return (
            <main>
                <div className='block create'>
                    <Font.Title>Carregando Perfil...</Font.Title>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className='block create'>

                <Font.Title>{'Adicionar Novo Depósito'}</Font.Title>
                <div className='section add-deposits'>
                    <div className='input-block'>
                        <Label>Nome do depósito</Label>
                        <Input
                            type='text'
                            value={deposit.name}
                            onChange={(e) => setDeposit(p => ({ ...p, name: e.target.value }))}
                        />
                    </div>
                    <div className='input-block'>
                        <Label>Valor do depósito (R$)</Label>
                        <Input
                            type='text'
                            value={deposit.value}
                            onChange={(e) => setDeposit(p => ({ ...p, value: e.target.value }))}
                        />
                    </div>
                </div>

                <Button.Submit onClick={handleAddDeposit}>
                    <i className='fa-solid fa-plus'></i>
                    ADICIONAR DEPÓSITO
                </Button.Submit>
                
                <hr />

                <Font.Title>{'Adicionar Novo Cartão'}</Font.Title>
                <form onSubmit={(e) => {e.preventDefault(); handleAddCard();}}>
                    <div className='section add-card'>
                        <div className='input-block'>
                            <Label>Nome do titular</Label>
                            <Input
                                type='text'
                                value={card.name}
                                onChange={(e) => setCard(p => ({ ...p, name: e.target.value }))}
                            />
                        </div>
                        <div className="input-row">
                            <div className='input-block'>
                                <Label>Banco</Label>
                                <Input
                                    type='text'
                                    value={card.bank}
                                    onChange={(e) => setCard(p => ({ ...p, bank: e.target.value }))}
                                />
                            </div>
                            <div className='input-block'>
                                <Label>Bandeira</Label>
                                <Input
                                    type='text'
                                    value={card.brand}
                                    onChange={(e) => setCard(p => ({ ...p, brand: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="input-row">
                            <div className='input-block'>
                                <Label>Últimos 4 Dígitos</Label>
                                <Input
                                    type='text'
                                    value={card.number}
                                    onChange={(e) => setCard(p => ({ ...p, number: e.target.value }))}
                                    maxLength={4}
                                />
                            </div>
                            <div className='input-block'>
                                <Label>Vencimento (MM/AA)</Label>
                                <Input
                                    type='text'
                                    value={card.date}
                                    onChange={(e) => setCard(p => ({ ...p, date: e.target.value }))}
                                    maxLength={5}
                                />
                            </div>
                        </div>
                        <div className='input-block'>
                            <Label>Apelido do Cartão</Label>
                            <Input
                                type='text'
                                value={card.title}
                                onChange={(e) => setCard(p => ({ ...p, title: e.target.value }))}
                            />
                        </div>
                    </div>

                    <Button.Submit type='submit'>
                        <i className='fa-solid fa-plus'></i>
                        ADICIONAR CARTÃO
                    </Button.Submit>
                </form>
                
                <hr/>

                <div className="new-purchase">
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
                            <ul className='card-options'>
                                {renderCards()}
                            </ul>
                        </div>

                        <div className="action-buttons">
                            {/* Assuming CANCEL button logic navigates or resets draft state */}
                            <Button.Cancel onClick={() => navigate('/')}>
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

                <hr />

                <Button.Default
                    onClick={() => navigate('/')}
                    style={{ marginTop: '1rem' }}
                >
                    <i className='fa-solid fa-chevron-left'></i>
                    VOLTAR PARA O INÍCIO
                </Button.Default>
            </div>
        </main>
    );
}
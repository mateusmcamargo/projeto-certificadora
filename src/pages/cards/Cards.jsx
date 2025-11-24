import './cards.css'

// react
import { useState, useEffect } from 'react'
import { nanoid, random } from 'nanoid'

//components
import { Button, Input, Label } from '../../components/ui/Ui'
import Font from '../../components/font/Font'

// hooks
import { useProfileContext } from '../../hooks/ProfileContext'
import { useAuth } from '../../hooks/AuthContext'

// use cases
import { updateUser } from '../../useCases/userCRUD'

// local management
const initialCardState = {
    id: '',
    title: '',
    name: '',
    number: '',
    brand: '',
    bank: '',
    date: ''
};

const CARD_COLORS    = [
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

export function Cards() {

    const { authData } = useAuth();
    
    // initializes local state to a safe default
    const { profile, setProfile } = useProfileContext();
    const [state, setState] = useState(profile); 

    const [card, setCard] = useState(initialCardState) 
    const [selectedCard, setSelectedCard] = useState(initialCardState); 

    // syncs 'state' with 'profile' when 'profile' changes
    useEffect(() => {
        if (profile) {
            setState(profile);
        }
    }, [profile]); 

    // saves whenever 'state' changes
    useEffect(() => {
        if (authData?.user?.email && state && state.id) {
            const saveProfile = async () => {
                await updateUser(authData.user.email, state);
                console.log('Profile saved successfully.');
                
                setProfile(state); 
            };
            
            saveProfile();
        }
    }, [state, authData.user.email, setProfile]); 

    // crud helper functions
    const handleAddCard = (
        newCardBank,
        newCardBrand,
        newCardDate,
        newCardName,
        newCardNumber,
        newCardTitle
    ) => {
        if (!newCardTitle) return;

        const newCard = {
            id: nanoid(), 
            bank: newCardBank,
            brand: newCardBrand,
            color: randomGradient(),
            date: newCardDate,
            name: newCardName,
            number: newCardNumber,
            title: newCardTitle
        };

        setState(prevState => ({
            ...prevState,
            cards: [...(prevState.cards || []), newCard]
        }));
        
        setCard(initialCardState);
    };

    const handleChangeCard = (updatedCard) => {
        setState(prevState => ({
            ...prevState,
            cards: prevState.cards.map(c => 
                c.id === updatedCard.id ? updatedCard : c
            )
        }));
    };

    const handleDeleteCard = (id) => {
        setState(prevState => ({
            ...prevState,
            cards: prevState.cards.filter(c => c.id !== id)
        }));
    };
    
    // loading state
    if (!state || !state.cards) {
        return (
            <main>
                <div className='block'>
                    <Font.Title>Carregando Cartões...</Font.Title>
                </div>
            </main>
        );
    }


    return (
        <main>
            <div className='block cards'>
                
                <Font.Title>{'Cartões'}</Font.Title>
                <form onSubmit={(e) => {e.preventDefault();}}>
                    <div className='section cards'>

                        <ul className='cards-list'>
                            {state.cards.map(c => (
                                <li key={c.id}>
                                    <div className='info'>
                                        <div className='header'>
                                            <p>{c.title}</p>
                                            <div className='actions'>
                                                <i className='fa-solid fa-pen-to-square edit'
                                                    onClick={() => {
                                                        setSelectedCard(c);
                                                        setCard(c);
                                                    }}
                                                >
                                                <span>Editar</span>
                                                </i>

                                                <i className='fa-solid fa-xmark delete'
                                                    onClick={() => {
                                                        handleDeleteCard(c.id);
                                                        if (selectedCard.id === c.id) {
                                                             setSelectedCard(initialCardState);
                                                        }
                                                    }}
                                                ></i>
                                            </div>
                                        </div>

                                        {selectedCard.id === c.id && (
                                        <div role='edit card' className='edit-card'>
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
                                            <div className='input-row'>
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

                                            <div className='buttons'>
                                                <Button.Cancel
                                                    onClick={() => {
                                                        setSelectedCard(initialCardState);
                                                        setCard(initialCardState);
                                                    }}
                                                >
                                                    <i className='fa-solid fa-xmark'></i>
                                                    Cancelar
                                                </Button.Cancel>

                                                <Button.Add
                                                    onClick={() => {
                                                        handleChangeCard(card);
                                                        setSelectedCard(initialCardState);
                                                        setCard(initialCardState);
                                                    }}
                                                >
                                                    <i className='fa-solid fa-floppy-disk'></i>
                                                    Salvar
                                                </Button.Add>
                                            </div>
                                        </div>
                                        )}
                                    </div>

                                    <div
                                        className='card'
                                        style={{ background: c.color}}
                                    >
                                        <div className='branding'>
                                            <p className='bank'>{c.bank}</p>
                                            <p className='brand'>{c.brand}</p>
                                            {/* <i className='fa-brands fa-cc-mastercard'></i> */}
                                        </div>
                                        <div className='type'>
                                            <i className='fa-solid fa-rectangle-list'></i>
                                            <i className='fa-solid fa-wifi'></i>
                                        </div>
                                        <div className='number'>
                                            <p>{'●'.repeat(4)}</p>
                                            <p>{'●'.repeat(4)}</p>
                                            <p>{'●'.repeat(4)}</p>
                                            <p>{c.number}</p>
                                        </div>
                                        <div className='footer'>
                                            <div className='data'>
                                                <span>{c.title}</span>
                                                <p>{c.name}</p>
                                            </div>
                                            <div className='date'>
                                                <span>Válido até</span>
                                                <p>{c.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </main>
    );
}
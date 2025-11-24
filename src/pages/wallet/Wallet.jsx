// style
import './wallet.css';

// react
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// components
import { ExpensesCard } from '../../components/Components';
import Font from '../../components/font/Font';
import { Button, Input, Label } from '../../components/ui/Ui';

// hooks
import { usePurchasesContext } from '../../hooks/PurchasesContext'
import { useProfileContext } from '../../hooks/ProfileContext'
import { useAuth } from '../../hooks/AuthContext';

// use cases
import { updateUser } from '../../useCases/userCRUD';

// utils
import { calcTotalExpenses } from '../../utils/calcTotalExpenses';

// local management
const initialDepositState = {
    id: '',
    value: '',
    name: '' // Added 'name' for the deposit title/name
};

export function Wallet() {

    const { authData } = useAuth();
    const { profile, setProfile } = useProfileContext();
    const [state, setState] = useState(profile);
    const [deposit, setDeposit] = useState(initialDepositState);
    const [selectedDeposit, setSelectedDeposit] = useState(initialDepositState);
    const { purchasesList } = usePurchasesContext();

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

    // CRUD helper functions
    const handleAddDeposit = (
        newDepositName,
        newDepositValue
    ) => {
        if (!newDepositName || !newDepositValue) return;

        const newDeposit = {
            id: nanoid(),
            name: newDepositName,
            value: newDepositValue,
        };

        setState(prevState => ({
            ...prevState,
            deposits: [...(prevState.deposits || []), newDeposit]
        }));

        setDeposit(initialDepositState);
    };
    const handleChangeDeposit = (updatedDeposit) => {
        setState(prevState => ({
            ...prevState,
            deposits: prevState.deposits.map(d =>
                d.id === updatedDeposit.id ? updatedDeposit : d
            )
        }));
        setSelectedDeposit(initialDepositState);
        setDeposit(initialDepositState);
    };
    const handleDeleteDeposit = (id) => {
        setState(prevState => ({
            ...prevState,
            deposits: prevState.deposits.filter(d => d.id !== id)
        }));
        if (selectedDeposit.id === id) {
            setSelectedDeposit(initialDepositState);
            setDeposit(initialDepositState);
        }
    };

    // Check if profile is loaded before trying to access deposits
    if (!profile) {
        return (
            <main>
                <div className='section block'>
                    <Font.Title>{'Carregando Carteira...'}</Font.Title>
                </div>
            </main>
        );
    }

    const totalExpenses = calcTotalExpenses(purchasesList);
    const categoriesCount = new Set(purchasesList.map(c => c.category)).size;
    // Use optional chaining or check for existence before reducing
    const totalDeposits = profile.deposits ? profile.deposits.reduce((acc, c) => +acc + (+c.value), 0) : 0;

    return (
        <main>
            <div className='block wallet'>

                <Font.Title>{'Carteira'}</Font.Title>
                <div className="section expenses">
                    <ExpensesCard
                        title={"Total gasto este mês"}
                        icon={'fa-solid fa-dollar-sign'}
                        description={`Distribuído em ${categoriesCount} categorias`}
                        value={totalExpenses}
                    />
                    <ExpensesCard
                        title={"Total recebido"}
                        icon={'fa-solid fa-money-bill-trend-up'}
                        description={"Valor de todos os depósitos"}
                        value={totalDeposits}
                        type='deposit'
                    />
                </div>

                <Font.Title>{'Depósitos'}</Font.Title>
                <div className="section deposits">
                    <ul className='deposits-list'>
                        {state.deposits.map(d => (
                            <li className='deposit' key={d.id}>
                                <div className='info'>
                                    <div className='header'>
                                        <div className="data">
                                            <p>{d.name}</p>
                                            <span>R${d.value}</span> 
                                        </div>
                                        <div className='actions'>
                                            <i className='fa-solid fa-pen-to-square edit'
                                                onClick={() => {
                                                    setSelectedDeposit(d);
                                                    setDeposit(d);
                                                }}
                                            >
                                                <span>Editar</span>
                                            </i>

                                            <i className='fa-solid fa-trash delete'
                                                onClick={() => {
                                                    handleDeleteDeposit(d.id);
                                                    if (selectedDeposit.id === d.id) {
                                                        setSelectedDeposit(initialDepositState);
                                                    }
                                                }}
                                            ></i>
                                        </div>
                                    </div>
                                </div>

                                {selectedDeposit.id === d.id && (
                                    <div role='edit deposit' className='edit-deposit'>
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
                                        <div className='buttons'>
                                            <Button.Cancel
                                                onClick={() => {
                                                    setSelectedDeposit(initialDepositState);
                                                    setDeposit(initialDepositState);
                                                }}
                                            >
                                                <i className='fa-solid fa-xmark'></i>
                                                Cancelar
                                            </Button.Cancel>
                                            <Button.Add
                                                onClick={() => handleChangeDeposit(deposit)}
                                            >
                                                <i className='fa-solid fa-floppy-disk'></i>
                                                Salvar
                                            </Button.Add>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}
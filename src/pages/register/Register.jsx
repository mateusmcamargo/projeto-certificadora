import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Font from "../../components/font/Font";
import { nanoid } from "nanoid";
import { Label, Input, Button } from "../../components/ui/Ui";
import { useAuth } from "../../hooks/AuthContext";

const initialCardState    = { id: 0, title: "" };
const initialDepositState = { id: 0, value: 0 };

export function Register() {

    const navigate = useNavigate();
    const {register} = useAuth();

    const [userData, setUserData] = useState({
        nome:"",
        email:"",
        cards:[],
        deposits:[]
    });
    const [card, setCard] = useState({initialCardState});
    const [deposit, setDeposit] = useState({initialDepositState});
    const [InitialBalance, setInitialBalance] = useState(0);

    return (
        <main>
            <div className='block'>
                <Font.Title>Crie sua conta</Font.Title>

                <Font.Subtitle>Insira seu nome</Font.Subtitle>
                <div className='input-block'>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        placeholder='Nome (sobrenome opicional)'
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}/>
                </div>

                <Font.Subtitle>Adicione seu primeiro depósito</Font.Subtitle>
                <div className='input-block'>
                    <Label className='required'>Depósito Inicial (R$)</Label>
                    <Input
                        type="number"
                        placeholder='1000,00'
                        value={deposit.value}
                        onChange={(e) => setDeposit({
                            ...deposit,
                            value:e.target.value
                        })}
                    />
                </div>
                <Button.Add
                    onClick={() => {
                        const depositValue = Number(deposit.value);

                        setUserData(prevUserData => ({
                            ...prevUserData,
                            deposits: [
                                ...prevUserData.deposits,
                                {...deposit, id: nanoid(), value: depositValue} 
                            ]
                        }));
                        setInitialBalance(prevBalance => prevBalance + depositValue);
                        setDeposit({ id: 0, value: 0 });
                    }}
                >
                    <i className='fa-solid fa-plus'></i>
                    ADICIONAR DEPÓSITO
                </Button.Add>

                {
                    userData.deposits.length && 
                    <>
                        <Font.Title
                            style={{
                                textAlign: 'left'
                            }}
                        >{`Saldo inicial: R$${InitialBalance}`}</Font.Title>
                    </>
                }

                <Font.Subtitle>Adicione seu primeiro cartão</Font.Subtitle>
                <div className='input-block'>
                    <Label>Nome do Titular</Label>
                    <Input
                        type="text"
                        placeholder='Nome e Sobrenome'
                        value={card.name}
                        onChange={(e) => setCard({...card, name:e.target.value})}
                    />
                </div>
                <div className="input-row">
                    <div className='input-block'>
                        <Label>Banco</Label>
                        <Input
                            type="text"
                            placeholder='Santander'
                            value={card.bank}
                            onChange={(e) => setCard({...card, bank:e.target.value})}
                        />
                </div>
                    <div className='input-block'>
                        <Label>Bandeira</Label>
                        <Input
                            type="text"
                            placeholder='Visa'
                            value={card.brand}
                            onChange={(e) => setCard({...card, brand:e.target.value})}
                        />
                    </div>
                </div>
                <div className="input-row">
                    <div className='input-block'>
                        <Label>Últimos 4 Dígitos</Label>
                        <Input
                            type="text"
                            placeholder='1234'
                            value={card.number}
                            onChange={(e) => setCard({...card, number:e.target.value})}
                        />
                </div>
                    <div className='input-block'>
                        <Label>Vencimento (MM/AA)</Label>
                        <Input
                            type="text"
                            placeholder='10/29'
                            value={card.date}
                            onChange={(e) => setCard({...card, date:e.target.value})}
                        />
                    </div>
                </div>
                <div className='input-block'>
                    <Label>Apelido do Cartão</Label>
                    <Input
                        type="text"
                        placeholder='Crédito Santander'
                        value={card.title}
                        onChange={(e) => setCard({...card, title:e.target.value})}
                    />
                </div>
                <Button.Add
                    onClick={() => {
                        setUserData(prevUserData => ({
                            ...prevUserData, 
                            cards:[...prevUserData.cards, {...card, id:nanoid()}]
                        }));
                        setCard(initialCardState);
                    }}
                >
                    <i className='fa-solid fa-plus'></i>
                    ADICIONAR CARTÃO
                </Button.Add>
                    
                {
                    userData.cards.length && 
                    <>
                        <Font.Title>Cartões adicionados</Font.Title>
                        <ul>
                            {userData.cards.map((card, index) => (
                                <li key={index}>{card.title}</li>
                            ))}
                        </ul>
                    </>            
                }
                
                <Button.Submit onClick={() => register(userData)}>
                    CRIAR CONTA
                </Button.Submit>
            </div>
        </main>
    );
}
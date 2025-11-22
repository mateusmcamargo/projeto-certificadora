import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Font from "../../components/font/Font";
import { nanoid } from "nanoid";
import { Label, Input, Button } from "../../components/ui/Ui";
import { useAuth } from "../../hooks/AuthContext";

export function Register() {
    const navigate = useNavigate();
    const {register} = useAuth();
    const [userData, setUserData] = useState({
        nome:"",
        email:"",
        cards:[],
        deposits:[]
    });
    const [card, setCard] = useState({
        id:0,
        title:""
    });
    const [deposit, setDeposit] = useState({
        id:0,
        value:0
    })

    return (
        <main>
            <div className='block'>
                <Font.Title>Crie sua conta</Font.Title>

                <div className='input-block'>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        value={userData.nome}
                        onChange={(e) => setUserData({...userData, nome: e.target.value})}/>
                </div>

                <div className='input-block'>
                    <Label className='required'>Depósito Inicial</Label>
                    <Input
                    type="number"
                    value={deposit.value.toString()}
                    onChange={(e) => setDeposit({...deposit,value:e.target.value.toString()})}
                    />
                </div>
                <Button.Add
                    onClick={() => {
                    setUserData({...userData, deposits:[...userData.deposits, {...deposit, id:nanoid()}]})}}
                >
                    <i className='fa-solid fa-plus'></i>
                    ADICIONAR DEPÓSITO
                </Button.Add>

                {
                    userData.deposits.length && 
                    <>
                        <Font.Subtitle>Depósitos adicionados:</Font.Subtitle>
                        <ul>
                            {userData.deposits.map((deposit, index) => (
                                <li key={index}>R$ {deposit.value}</li>
                            ))}
                        </ul>
                    </>
                }

                <div className='input-block'>
                    <Label>Adicionar cartão</Label>
                    <Input
                        type="text"
                        value={card.title}
                        onChange={(e) => setCard({...card, title:e.target.value, id:nanoid()})}
                    />
                </div>
                <Button.Add
                    onClick={() => setUserData({...userData, cards:[...userData.cards, card]})}
                >
                    <i className='fa-solid fa-plus'></i>
                    ADICIONAR CARTÃO
                </Button.Add>
                    
                {
                    userData.cards.length && 
                    <>
                        <Font.Subtitle>Cartões adicionados:</Font.Subtitle>
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
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase-config";
import { Navigate, useNavigate } from "react-router-dom";
import { saveUser } from "../useCases/userCRUD";
import Font from "../components/font/Font";
import { nanoid } from "nanoid";
import { Label, Input } from "../components/ui/Ui";
import { useAuth } from "../hooks/AuthContext";

const Register = () => {
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
        <div>
        <div>
            <Font.Title>Registrar</Font.Title>
            <Label>Nome</Label>
            <Input type="text" value={userData.nome} onChange={(e) => setUserData({...userData, nome: e.target.value})} />
            <Label>Adicionar depósito inicial (obrigatóio)</Label>
            <Input type="number" value={deposit.value.toString()} onChange={(e) => setDeposit({...deposit,value:e.target.value.toString()})} />
            <button onClick={() => {
                setUserData({...userData, deposits:[...userData.deposits, {...deposit, id:nanoid()}]})}
            }>Adicionar depósito</button>
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
            <Label>Adicionar cartao</Label>
            <Input type="text" onChange={(e) => setCard({...card, title:e.target.value, id:nanoid()})} value={card.title}/>
            <button onClick={() => {
                setUserData({...userData, cards:[...userData.cards, card]})}
            }>Adicionar cartão</button>
                
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
            
            <button onClick={() => register(userData)}>Registrar</button>

        </div>
        </div>
    );
}

export default Register;
import { useReducer, useState } from 'react'
import { Button, Input, Label } from '../../components/ui/Ui'
import Font from "../../components/font/Font"
import "./profile.css"
import { useProfileContext } from '../../hooks/ProfileContext'
import { NavLink } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { updateUser } from '../../useCases/userCRUD'
import { useAuth } from '../../hooks/AuthContext'

const Profile = () => {    
    const {authData} = useAuth();
    console.log("dasd",useProfileContext())
    const profileReducer = (state, action) => {
        const actions = {
            'nameChange':() => ({...state, name:action.payload.value}),
            'emailChange':() => ({...state, email:action.payload.value}),
            'add_card':() => ({...state, cards:[...state.cards, {id:nanoid(), title:action.payload.card.title}]}),
            'change_card':() => ({...state, cards:state.cards.map(card => card.id == action.payload.card.id ? action.payload.card : card)}),
            'delete_card':() => ({...state, cards:state.cards.filter(card => card.id != action.payload.id)}),
            'add_deposit':() => ({...state, deposits:[...state.deposits, {id:nanoid(), value:action.payload.deposit.value}]}),
            'change_deposit':() => ({...state, deposits:state.deposits.map(deposit => deposit.id == action.payload.deposit.id ? action.payload.deposit : deposit)}),
            'delete_deposit':() => ({...state, deposits:state.deposits.filter(deposit => deposit.id != action.payload.id)}),
            'save':async () => { updateUser(authData.user.email, state) }
        }
        return actions[action.type]();
    }
    const [state, dispatch] = useReducer(profileReducer, useProfileContext().profile);
    const [card, setCard] = useState({id:"", title:""})
    const [deposit, setDeposit] = useState({id:"", value:""})
    const [selectedCard, setSelectedCard] = useState({id:""});
    const [selectedDeposit, setSelectedDeposit] = useState({id:""});

    return (
        <section id="profile">
            <form onSubmit={(e) => {e.preventDefault();}}>
                <Label>Nome
                    <Input type="text" value={state.name} onChange={(e) => dispatch({type:'nameChange', payload:{value:e.target.value}})}/>
                </Label>
                <Label>Email
                    <Input type="email" value={state.email} onChange={(e) => dispatch({type:'emailChange', payload:{value:e.target.value}})}/>
                </Label>
                <article>
                    <Font.Subtitle>Cartões</Font.Subtitle>
                    <section role="edit card" id="editCard">
                        <Label>ID do cartão
                            <Input type="text" value={card.id} onChange={(e) => {setCard(p => ({...p, id:e.target.value}))}}/>
                        </Label>
                        <Label>Nome do cartão
                            <Input type="text"value={card.title} onChange={(e) => {setCard(p => ({...p, title:e.target.value}))}}/>
                        </Label>
                        <Button.Submit onClick={() => {dispatch({type:'add_card',payload:{card}})}}>Adicionar Cartão (rascunho)</Button.Submit>
                        <Button.Submit onClick={() => {dispatch({type:'change_card',payload:{card}})}}>Alterar Cartão (rascunho)</Button.Submit>
                    </section>
                    <ul>
                        { state.cards && state.cards.map(card => (<li key={card.id}>
                            <Button.Option selected={selectedCard.id == card.id} onClick={() => {setSelectedCard({id:card.id}); setCard(card);}}>
                                {card.title}
                                <i className='fa-solid fa-xmark' onClick={() => dispatch({type:'delete_card', payload:{id:card.id}})}></i>
                            </Button.Option>
                        </li>))}
                    </ul>
                </article>
                <article>
                    <Font.Subtitle>Depósitos</Font.Subtitle>
                    <section role="edit deposit" id="editDeposit">
                        <Label>ID do depósito
                            <Input type="text" value={deposit.id} onChange={(e) => {setDeposit(p => ({...p, id:e.target.value}))}}/>
                        </Label>
                        <Label>Valor do depósito (R$)
                            <Input type="text"value={deposit.value} onChange={(e) => {setDeposit(p => ({...p, value:e.target.value}))}}/>
                        </Label>
                        <Button.Submit onClick={() => {dispatch({type:'add_deposit',payload:{deposit}})}}>Adicionar Depósito (rascunho)</Button.Submit>
                        <Button.Submit onClick={() => {dispatch({type:'change_deposit',payload:{deposit}})}}>Alterar Depósito (rascunho)</Button.Submit>
                    </section>
                    <ul>
                        { state.deposits && state.deposits.map(deposit => (<li key={deposit.id}>
                            <Button.Option selected={selectedDeposit.id == deposit.id} onClick={() => {setSelectedDeposit({id:deposit.id}); setDeposit(deposit);}}>
                                R$ {deposit.value}
                                <i className='fa-solid fa-xmark' onClick={() => dispatch({type:'delete_deposit', payload:{id:deposit.id}})}></i>
                            </Button.Option>
                        </li>))}
                    </ul>
                </article>
                <div>
                    <NavLink to="/"><Button.Cancel>Cancelar</Button.Cancel></NavLink>
                    <Button.Submit onClick={() => dispatch({type:'save'})}>Salvar alterações</Button.Submit>
                </div>
            </form>
        </section>
    )
}

export default Profile
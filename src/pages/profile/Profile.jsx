import './profile.css'

import { useReducer, useState } from 'react'
import { Button, Input, Label } from '../../components/ui/Ui'
import Font from '../../components/font/Font'
import { useProfileContext } from '../../hooks/ProfileContext'
import { NavLink } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { updateUser } from '../../useCases/userCRUD'
import { useAuth } from '../../hooks/AuthContext'

export function Profile() {

    const { authData } = useAuth();
    
    //console.log('dasd',useProfileContext())

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

    return (
        <main>
            <div className='block profile'>
                
                <Font.Title>{`Perfil de ${state.name}`}</Font.Title>

                <form onSubmit={(e) => {e.preventDefault();}}>

                    <Font.Subtitle>Dados Pessoais</Font.Subtitle>   
                    <div className='section user'>
                        <div className='input-block'>
                            <Label>Nome</Label>
                            <Input
                                type='text' 
                                value={state.name}
                                onChange={(e) => dispatch({type:'nameChange', payload:{value:e.target.value}})}
                            />
                        </div>

                        <div className='input-block'>
                            <Label>Email</Label>
                            <Input
                                type='email'
                                value={state.email}
                                onChange={(e) => dispatch({type:'emailChange', payload:{value:e.target.value}})}
                            />
                        </div>
                    </div>

                    <div className='actions'>
                        <NavLink to='/'>
                            <Button.Cancel>
                                <i className='fa-solid fa-xmark'></i>
                                Cancelar
                            </Button.Cancel>
                        </NavLink>
                        <Button.Add
                            onClick={() => dispatch({type:'save'})}
                        >
                            <i className='fa-solid fa-floppy-disk'></i>
                            Salvar
                        </Button.Add>
                    </div>
                </form>
            </div>
        </main>
    );
}
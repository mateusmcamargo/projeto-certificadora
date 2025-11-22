import React from 'react'
import { useAuth } from '../hooks/AuthContext';
import { Button } from '../components/ui/Ui';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const {login} = useAuth();

    return (
        <div style={{marginBlock:"5rem", display:"flex", flexDirection:"column", gap:"1rem", width:"80%", marginInline:"auto"}}>
            <NavLink to="/register"><Button.Submit>Registrar</Button.Submit></NavLink>
            <Button.Submit onClick={login}>Logar</Button.Submit>
        </div>
    )
}

export default Login
import React from 'react'
import { useAuth } from '../hooks/AuthContext';
import { Button } from '../components/ui/Ui';

const Login = () => {
    const {login} = useAuth();

    return (
        <div style={{marginBlock:"5rem"}}>
            <Button.Submit onClick={login}>Logar</Button.Submit>
        </div>
    )
}

export default Login
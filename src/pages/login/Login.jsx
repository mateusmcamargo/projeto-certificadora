import './login.css';

import { useAuth } from '../../hooks/AuthContext';
import { Button } from '../../components/ui/Ui';
import { NavLink } from 'react-router-dom';
import Font from '../../components/font/Font';
import { Logo } from '../../components/Components';

export function Login() {
    const {login} = useAuth();

    return (
        <main>
            <div className='block login'>

                <Logo/>

                <div className='option'>
                    <Font.Title>É seu primeiro acesso?</Font.Title>
                    <NavLink to="/register">
                        <Button.Submit>CRIAR CONTA</Button.Submit>
                    </NavLink>
                </div>
                <div className='option'>
                    <Font.Title>Já é nosso cliente?</Font.Title>
                    <Button.Submit onClick={login}>ENTRAR</Button.Submit>
                </div>
            </div>
        </main>
    );
}
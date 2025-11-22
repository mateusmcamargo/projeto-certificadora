import React from 'react'
import './topNavbar.css'
import { Button } from '../ui/Ui'
import { FiLogOut } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'
import { useAuth } from '../../hooks/AuthContext';

const TopNavbar = () => {

    const { logout } = useAuth();

    return (
        <section className="topNavbar">
            <nav>
                <div className='pages'>
                    <NavLink to="/" className='page'>
                        <i className="fa-solid fa-house"></i>
                        <span>Início</span>
                    </NavLink>
                    <NavLink to="/profile" className='page'>
                            <i className="fa-solid fa-user"></i>
                            <span>Perfil</span>
                    </NavLink>
                    <NavLink to="/login" className='page'>
                            <i class="fa-solid fa-right-to-bracket"></i>
                            <span>Entrar</span>
                    </NavLink>
                    <NavLink onClick={logout} className='page'>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <span>Sair</span>
                    </NavLink>
                </div>
            </nav>
        </section>
    )
}

export default TopNavbar
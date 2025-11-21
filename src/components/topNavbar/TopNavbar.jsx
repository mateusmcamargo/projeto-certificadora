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
        <header id="topNavbar">
            <div className="right">
                <NavLink to="/"><Button.Menu><GoHomeFill className="icon"/></Button.Menu></NavLink>
                <NavLink to="/profile"><Button.Menu><IoPerson className="icon"/></Button.Menu></NavLink>
                <NavLink to="/login"><Button.Menu>Login</Button.Menu></NavLink>
                <Button.Menu onClick={logout}><FiLogOut className="icon"/></Button.Menu>
            </div>
        </header>
    )
}

export default TopNavbar
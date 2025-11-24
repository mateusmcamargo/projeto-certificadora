import './topNavbar.css'
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const TopNavbar = () => {

    const location = useLocation();
    const { logout } = useAuth();

    return (
        <section className='topNavbar'>
            <nav>
                <div className='pages'>
                    <NavLink to='/profile' className='page'>
                            <i className='fa-solid fa-user'></i>
                            <span>Perfil</span>
                    </NavLink>
                    <NavLink onClick={logout} className='page'>
                        <i className='fa-solid fa-right-from-bracket'></i>
                        <span>Sair</span>
                    </NavLink>
                </div>
            </nav>
        </section>
    )
}

export default TopNavbar
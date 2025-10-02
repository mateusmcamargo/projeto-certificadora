import { NavLink } from 'react-router-dom';
import './navbar.css';
import { FaReceipt, FaCreditCard, FaPlus, FaWallet, FaCalendar } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';

export function Navbar() {

    return (
        <section className='navbar'>

            <nav>

                <div className='pages'>
                    <NavLink to='/extract' className='page'>
                        <FaReceipt className='active'/>
                        <span className='active'>Extrato</span>
                    </NavLink>
                    <NavLink to='/cards' className='page'>
                        <FaCreditCard/>
                        <span>Cartões</span>
                    </NavLink>
                </div>

                <div className='pages'>
                    <button className='add'>
                        <FaPlus/>
                    </button>
                </div>

                <div className='pages'>

                    <NavLink to='/wallet' className='page'>
                        <FaWallet/>
                        <span>Carteira</span>
                    </NavLink>
                    <NavLink to='/calendar' className='page'>
                        <FaCalendarAlt/>
                        <span>Calendário</span>
                    </NavLink>

                </div>

            </nav>

        </section>
    )
}
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { FaReceipt, FaCreditCard, FaPlus, FaWallet, FaCalendar, FaFileInvoiceDollar, FaChartPie } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';

export function Navbar() {

    return (
        <section className='navbar'>

            <nav>

                <div className='pages'>
                    <NavLink to='/' className='page'>
                        <FaChartPie/>
                        <span>Dados</span>
                    </NavLink>
                    <NavLink to='/cards' className='page'>
                        <FaCreditCard/>
                        <span>Cartões</span>
                    </NavLink>
                </div>

                <div className='pages'>
                    <button className='add'>
                        <NavLink to='/create'>
                            <FaPlus/>
                        </NavLink>
                    </button>
                </div>

                <div className='pages'>

                    <NavLink to='/wallet' className='page'>
                        <FaWallet/>
                        <span>Carteira</span>
                    </NavLink>
                    <NavLink to='/invoice' className='page'>
                        <FaFileInvoiceDollar/>
                        <span>Nota Fiscal</span>
                    </NavLink>

                </div>

            </nav>

        </section>
    )
}
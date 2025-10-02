import { FaBasketShopping, FaCar, FaCartShopping, FaGamepad } from "react-icons/fa6";

import './extract.css';
import { FaBusAlt, FaCarAlt } from "react-icons/fa";

export function Extract() {

    return (
        <main>
            <section className='purchases'>

                <div className='day'>
                    <h2>01 de outubro</h2>

                    <div className='purchase'>
                        <div className='icon'>
                            <FaCartShopping/>
                        </div>
                        <div className='content'>
                            <div className='row method'>
                                <span>CRÉDITO</span>
                            </div>
                            <div className='row place price'>
                                <h3>MOLINIS AV SAO</h3>
                                <h3>R$ 80,15</h3>
                            </div>
                            <div className='row user'>
                                <p className='user'>JOÃO</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='day'>
                    <h2>30 de setembro</h2>

                    <div className='purchase'>
                        <div className='icon'>
                            <FaGamepad/>
                        </div>
                        <div className='content'>
                            <div className='row method'>
                                <span>DÉBITO</span>
                            </div>
                            <div className='row place price'>
                                <h3>XBOX BRASIL</h3>
                                <h3>R$ 59,99</h3>
                            </div>
                            <div className='row user'>
                                <p className='user'>JOÃO</p>
                            </div>
                        </div>
                    </div>

                    <div className='purchase'>
                        <div className='icon'>
                            <FaCarAlt/>
                        </div>
                        <div className='content'>
                            <div className='row method'>
                                <span>DINHEIRO</span>
                            </div>
                            <div className='row place price'>
                                <h3>AUTOPOSTO LONDRES</h3>
                                <h3>R$ 100,00</h3>
                            </div>
                            <div className='row user'>
                                <p className='user'>JOÃO</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='day'>
                    <h2>27 de setembro</h2>

                    <div className='purchase'>
                        <div className='icon'>
                            <FaBasketShopping/>
                        </div>
                        <div className='content'>
                            <div className='row method'>
                                <span>CARTÃO POUPANÇA</span>
                            </div>
                            <div className='row place price'>
                                <h3>FEIRA SÃO JUDAS</h3>
                                <h3>R$ 27,30</h3>
                            </div>
                            <div className='row user'>
                                <p className='user'>MARIA</p>
                            </div>
                        </div>
                    </div>

                    <div className='purchase'>
                        <div className='icon'>
                            <FaBasketShopping/>
                        </div>
                        <div className='content'>
                            <div className='row method'>
                                <span>CARTÃO POUPANÇA</span>
                            </div>
                            <div className='row place price'>
                                <h3>FEIRA SÃO JUDAS</h3>
                                <h3>R$ 8,50</h3>
                            </div>
                            <div className='row user'>
                                <p className='user'>MARIA</p>
                            </div>
                        </div>
                    </div>

                    <div className='purchase'>
                        <div className='icon'>
                            <FaBusAlt/>
                        </div>
                        <div className='content'>
                            <div className='row method'>
                                <span>CRÉDITO</span>
                            </div>
                            <div className='row place price'>
                                <h3>VIAÇÃO ANDORINHA</h3>
                                <h3>R$ 250,00</h3>
                            </div>
                            <div className='row user'>
                                <p className='user'>JOÃO</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='day'>
                    <h2>01 de outubro</h2>

                    <div className='purchase'>
                        <div className='icon'>
                            <FaCartShopping/>
                        </div>
                        <div className='content'>
                            <div className='row method'>
                                <span>CRÉDITO</span>
                            </div>
                            <div className='row place price'>
                                <h3>MOLINIS AV SAO</h3>
                                <h3>R$ 80,15</h3>
                            </div>
                            <div className='row user'>
                                <p className='user'>JOÃO</p>
                            </div>
                        </div>
                    </div>

                    <div className='purchase'>
                        <div className='icon'>
                            <FaCartShopping/>
                        </div>
                        <div className='content'>
                            <div className='row method'>
                                <span>CRÉDITO</span>
                            </div>
                            <div className='row place price'>
                                <h3>MOLINIS AV SAO</h3>
                                <h3>R$ 80,15</h3>
                            </div>
                            <div className='row user'>
                                <p className='user'>JOÃO</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='day'>
                    <h2>21 de setembro</h2>

                    <div className='purchase'>
                        <div className='icon'>
                            <FaCartShopping/>
                        </div>
                        <div className='content'>
                            <div className='row method'>
                                <span>CRÉDITO</span>
                            </div>
                            <div className='row place price'>
                                <h3>MOLINIS AV SAO</h3>
                                <h3>R$ 80,15</h3>
                            </div>
                            <div className='row user'>
                                <p className='user'>JOÃO</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    )
}
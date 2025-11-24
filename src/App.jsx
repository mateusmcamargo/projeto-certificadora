// react and npm
import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';

// components
import { Navbar } from './components/navbar/Navbar'

// fonts
import '@fontsource-variable/montserrat';
import '@fontsource/poppins';
import '@fontsource/lexend-deca';

// style
import './app.css';
import './variables.css';

import { Invoice, ProtectedRoute, Register, Login, Profile, Cards, Wallet, Charts } from './pages/Pages';
import { testInvoiceCRUD } from './useCases/tests/invoice';
import { testCardCRUD } from './useCases/tests/card';
import { testUserCRUD } from './useCases/tests/user';
import { testPurchaseCrud } from './useCases/tests/purchase';
import { AuthProvider } from './hooks/AuthContext';
import { PurchasesProvider } from './hooks/PurchasesContext';
import { ProfileProvider } from './hooks/ProfileContext';
import TopNavbar from './components/topNavbar/TopNavbar';
import { Create } from './pages/create/Create';
import { PurchasesManagerDraftLogic } from './components/PurchasesManagerDraftLogic';

function App() {

    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [error, setError]   = useState(null);

    useEffect(() => {
        const runTests = async () => {
            try {
                if (!loading) setLoading(true);
                await testUserCRUD();
                await testCardCRUD();
                await testInvoiceCRUD();
                await testPurchaseCrud();
            } catch (error) {
                console.error('ERROR DURING TESTS: ', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        //runTests();
    }, []);

    return (
        <AuthProvider>
            <ProfileProvider>
                <PurchasesProvider>
                    <div className='app'>

                        {location.pathname !== '/login'   &&
                        location.pathname  !== '/register' && 
                        <TopNavbar/>}

                        <Routes>
                            <Route path='/' element={
                                <ProtectedRoute>
                                    <Charts/>
                                </ProtectedRoute>
                            }/>
                            <Route path='/invoice' element={
                                <ProtectedRoute>
                                    <Invoice/>
                                </ProtectedRoute>
                            }/>
                            <Route path='/cards' element={
                                <ProtectedRoute>
                                    <Cards/>
                                </ProtectedRoute>
                            }/>
                            <Route path='/create' element={
                                <ProtectedRoute>
                                    <PurchasesManagerDraftLogic>
                                        <Create/>
                                    </PurchasesManagerDraftLogic>
                                </ProtectedRoute>
                            }/>
                            <Route path='/profile' element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }/>
                            <Route path='/wallet' element={
                                <ProtectedRoute>
                                    <Wallet/>
                                </ProtectedRoute>
                            }/>


                            <Route path='/login' element={<Login/>}/>
                            <Route path='/register' element={<Register/>}/>

                        </Routes>

                        {location.pathname !== '/login'   &&
                        location.pathname  !== '/register' && 
                        <Navbar/>}

                    </div>
                </PurchasesProvider>
            </ProfileProvider>
        </AuthProvider>
    )
}

export default App

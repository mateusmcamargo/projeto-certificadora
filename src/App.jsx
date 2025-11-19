// react and npm
import { useEffect, useState } from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';

// components
import { Navbar } from './components/navbar/Navbar'

// fonts
import '@fontsource-variable/montserrat';
import '@fontsource/poppins';
import '@fontsource/lexend-deca';

// style
import './app.css';
import './colors.css';
import './variables.css';

import Home from './pages/home/Home';
import { Extract } from './pages/Extract';
import { testInvoiceCRUD } from './useCases/tests/invoice';
import { testCardCRUD } from './useCases/tests/card';
import { testUserCRUD } from './useCases/tests/user';
import { testPurchaseCrud } from './useCases/tests/purchase';
import { AuthProvider } from './hooks/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import { PurchasesProvider } from './hooks/PurchasesContext';
import { ProfileProvider } from './hooks/ProfileContext';

function App() {

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
        <BrowserRouter>
            <AuthProvider>
                <ProfileProvider>
                    <PurchasesProvider>
                        <div className='app'>
                            <Routes>
                                <Route path='/extract' element={
                                    <ProtectedRoute>
                                        <Extract/>
                                    </ProtectedRoute>
                                }/>
                                <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                                <Route path='/login' element={<Login/>}/>
                            </Routes>
                            <Navbar/>
                        </div>
                    </PurchasesProvider>
                </ProfileProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App

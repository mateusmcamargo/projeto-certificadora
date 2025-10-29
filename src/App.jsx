import './App.css'
// react and npm
import { useEffect, useState } from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';

// components
import { Navbar } from './components/navbar/Navbar'

// fonts
import '@fontsource-variable/montserrat';

// style
import './App.css'
import './index.css'
import Home from './pages/home';
import { Extract } from './pages/Extract';
import { testInvoiceCRUD } from './useCases/tests/invoice';
import { testCardCRUD } from './useCases/tests/card';
import { testUserCRUD } from './useCases/tests/user';
import { testPurchaseCrud } from './useCases/tests/purchase';
import { AuthProvider } from './hooks/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';

function App() {

    const [loading, setLoading] = useState(false);
    const [error, setError]   = useState(null);
    useEffect(() => {
        const runTests = async () => {
            try {
                if (!loading) setLoading(true);
                // await testUserCRUD();
                // await testCardCRUD();
                // await testInvoiceCRUD();
                // await testPurchaseCrud();
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
                <div className='app'>
                    <Routes>
                        <Route path='/extract' element={<ProtectedRoute><Extract/></ProtectedRoute>}/>
                        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                    <Navbar/>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App

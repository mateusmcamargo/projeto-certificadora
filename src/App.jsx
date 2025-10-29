import './App.css'
// react and npm
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
        <Router>
            <div className='app'>
                <Routes>
                    <Route path='/extract' element={<Extract/>}/>
                    <Route path='/' element={<Home/>}/>
                </Routes>

                <Navbar/>
            </div>
        </Router>
    )
}

export default App

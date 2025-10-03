import './App.css'
// react and npm
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// firebase
import { collection, doc, getDocs } from 'firebase/firestore'
import { database } from './firebase-config'
import { fetchUsers } from './useCases/fetchUsers';

// components
import { Navbar } from './components/navbar/Navbar'

// fonts
import '@fontsource-variable/montserrat';

// style
import './App.css'
import './index.css'
import Home from './pages/home';
import { Extract } from './pages/Extract';

function App() {
    
    const [users,   setUsers]   = useState([]);
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState(null);

    // useEffect(() => {

    //     const fetchUsers = async () => {
    //         try {
    //             if (!loading) {setLoading(true);}
    //             const usersSnap = await getDocs(collection(database, 'users'));
    //             const usersData = usersSnap.docs.map(user => ({
    //                 id: user.id,
    //                 ...user.data()
    //             }));
    //             setUsers(usersData);
    //         }
    //         catch(error) {
    //             console.error('ERROR FETCHING USERS: ', error);
    //             setError(error);
    //         }
    //         finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchUsers();
    // }, []);

    // if (error) {
    //     return (
    //         <p>ERROR: {error}</p>
    //     );
    // }
    // if (loading) {
    //     return (
    //         <p>loading...</p>
    //     );
    // }


    return (
        <Router>
            <div className='app'>
                <Routes>
                    <Route path='/extract' element={<Extract/>}/>
                    <Route path='/' element={<Home/>}/>
                </Routes>

                <Navbar/>

                {/* <section className='users'>
                    {users.map(user => (
                        <div className='user' key={user.id}>
                        <p><span>id: </span>{user.id}</p>
                        <p><span>nome: </span>{user.name}</p>
                        <p><span>senha: </span>{user.password}</p>
                        <p><span>data de nascimento: </span>{user.birth?.toDate().toLocaleString('en-GB').slice(0, 10)}</p>
                        </div>
                    ))}
                </section>  */}
            </div>
        </Router>
    )
}

export default App

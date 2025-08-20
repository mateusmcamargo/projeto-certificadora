import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { collection, doc, getDocs } from 'firebase/firestore'
import { database } from './firebase-config'

function App() {

    const [users,   setUsers]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                if (!loading) {setLoading(true);}
                const usersSnap = await getDocs(collection(database, 'users'));
                const usersData = usersSnap.docs.map(user => ({
                    id: user.id,
                    ...user.data()
                }));
                setUsers(usersData);
            }
            catch(error) {
                console.error('ERROR FETCHING USERS: ', error);
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (error) {
        return (
            <p>ERROR: {error}</p>
        );
    }
    if (loading) {
        return (
            <p>loading...</p>
        );
    }

    return (
        <section className='users'>
            {users.map(user => (
                <div className='user' key={user.id}>
                    <p><span>id: </span>{user.id}</p>
                    <p><span>nome: </span>{user.name}</p>
                    <p><span>senha: </span>{user.password}</p>
                    <p><span>data de nascimento: </span>{user.birth?.toDate().toLocaleString('en-GB').slice(0, 10)}</p>
                </div>
            ))}
        </section> 
    )
}

export default App

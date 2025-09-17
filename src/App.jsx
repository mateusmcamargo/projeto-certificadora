import { useEffect, useState } from 'react'
import './App.css'
import { collection, getDocs } from 'firebase/firestore'
import { database } from './firebase-config'
import NotaFiscalSection from './components/NotaFiscalSection';
import PurchasesManagerDraftSidebar from './components/PurchasesManagerDraftSidebar';
import PurchaseManagerLogic from './components/PurchasesManagerDraftLogic';
import PurchasesManagerDialog from './components/ui/PurchasesManagerDialog';
import { fetchUsers } from './useCases/fetchUsers';

function App() {

    const [users,   setUsers]   = useState([]);
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        //fetchUsers();
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
        <div>
            <section className="purchase-manager-with-webscraping">
                <div style={{display:'flex', alignItems:"flex-start", flexWrap:"wrap", justifyContent:'center'}}>
                    <PurchaseManagerLogic>
                        <NotaFiscalSection/>
                        <PurchasesManagerDraftSidebar/>
                        <PurchasesManagerDialog/>
                    </PurchaseManagerLogic>
                </div>
            </section>
        </div>
    )
}

export default App

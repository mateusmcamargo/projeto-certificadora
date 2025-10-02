import React from 'react'
import PurchasesManagerDraftLogic from '../components/PurchasesManagerDraftLogic'
import NotaFiscalSection from '../components/NotaFiscalSection'
import PurchasesManagerDialog from '../components/ui/PurchasesManagerDialog'
import PurchasesManagerDraftSidebar from '../components/PurchasesManagerDraftSidebar'

const Home = () => {
    return (
        <div>
            <section className="purchase-manager-with-webscraping">
                <div style={{display:'flex', alignItems:"flex-start", flexWrap:"wrap", justifyContent:'center'}}>
                    <PurchasesManagerDraftLogic>
                        <NotaFiscalSection/>
                        <PurchasesManagerDraftSidebar/>
                        <PurchasesManagerDialog/>
                    </PurchasesManagerDraftLogic>
                </div>
            </section>
        </div>  
    )
}

export default Home
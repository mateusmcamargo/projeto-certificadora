import './invoice.css'

import {
  InvoiceScrapper,
  NewPurchase,
  PurchasesManagerDraftLogic,
} from '../../components/Components';
import PurchasesManagerDialog from '../../components/ui/PurchasesManagerDialog';

export function Invoice() {

    return (
        <main>
            <PurchasesManagerDraftLogic>
                <InvoiceScrapper/>
                <NewPurchase/>
                <PurchasesManagerDialog/>
            </PurchasesManagerDraftLogic>
        </main>  
    );
}
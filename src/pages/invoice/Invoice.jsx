import './invoice.css'

import {
  InvoiceScrapper,
  NewPurchase,
  PurchasesManagerDraftLogic,
} from '../../components/Components';
import PurchasesManagerDialog from '../../components/ui/PurchasesManagerDialog';
import Font from '../../components/font/Font';

export function Invoice() {

    return (
        <main>
            <PurchasesManagerDraftLogic>
                <InvoiceScrapper/>
                <Font.Title>Adicionar Compras</Font.Title>
                <NewPurchase/>
                <PurchasesManagerDialog/>
            </PurchasesManagerDraftLogic>
        </main>  
    );
}
import { addInvoice, getInvoices, updateInvoice, deleteInvoice } from '../invoiceCRUD.js';

export async function testInvoiceCRUD() {
  await addInvoice("usuario1", {
    cartaoId: "card1",
    mesReferencia: "2025-10",
    valorTotal: 430.45,
    pago: false
  });

  await addInvoice("usuario1", {
    cartaoId: "card1",
    mesReferencia: "2025-09",
    valorTotal: 389.90,
    pago: true
  });

  await addInvoice("usuario2", {
    cartaoId: "card2",
    mesReferencia: "2025-10",
    valorTotal: 150.00,
    pago: false
  });

  const invoices = await getInvoices("usuario1");
  console.log(invoices);

  await updateInvoice("usuario1", "fYvwvK3LieGh9UghxKlD", { pago: true, valorTotal:500 });

  await deleteInvoice("usuario1", "invoice2");
}
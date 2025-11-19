import React, { useMemo } from 'react'
import { Button } from './Ui';
import Input from './Input'
import Label from './Label'
import { usePurchasesDraftContext } from '../../hooks/PurchasesDraftContext'
import Font from '../font/Font'

const dialogStyle = (enabled) => ({
		display: enabled ? "flex" : "none",
		flexDirection:"column",
		gap:".5rem",
		overflow:"hidden",
		padding:"1rem",
		borderRadius:".5rem",
		border:"none",
		backgroundColor:"var(--lightgrey)"

})

const PurchasesManagerDialog = () => {

	const {
		selectedPurchases,
		onChangesCancel,
		onChangesConfirm,
		deletePurchases,
		changesForm,
		setChangesForm
	} = usePurchasesDraftContext();

	const onCategoryChange = (e) => {
		setChangesForm(form => ({...form, category:e.target.value}));
	}
	const onPriceChange = (e) => {
		if(!isNaN(e.target.value)) setChangesForm(form => ({...form, price:+e.target.value}));
	}
	const onQuantityChange = (e) => {
		if(!isNaN(e.target.value)) setChangesForm(form => ({...form, qtd:+e.target.value}));
	}

	const selectedQtd = selectedPurchases.length;

	return (
		<section role="edit-purchases-dialog" style={dialogStyle(selectedQtd > 0)}>
			<Font.Subtitle>Compras selecionadas: {selectedQtd}</Font.Subtitle>
			<div>
				<Label>
					Título
					<Input placeholder="Ex: Carne" value={changesForm.title} onChange={(e) => setChangesForm(form => ({...form, title:e.target.value}))}/>
				</Label>
				<Label>
					Categoria
					<Input placeholder="Ex:Comida" value={changesForm.category} onChange={onCategoryChange}/>
				</Label>
				<Label>
					Preço
					<Input placeholder="Ex: 20.00" value={changesForm.price} onChange={onPriceChange}/>
				</Label>
				<Label>
					Quantidade
					<Input placeholder="Ex: 1" value={changesForm.qtd} onChange={onQuantityChange}/>
				</Label>
			</div>
			<div style={{display:"flex", flexWrap:"wrap", gap:".25rem"}}>
				<Button.Submit onClick={onChangesConfirm}>Alterar</Button.Submit>
				<Button.Submit onClick={deletePurchases}>Deletar</Button.Submit>
				<Button.Cancel onClick={onChangesCancel}>Cancelar</Button.Cancel>
			</div>
		</section>
	)
}

export default PurchasesManagerDialog
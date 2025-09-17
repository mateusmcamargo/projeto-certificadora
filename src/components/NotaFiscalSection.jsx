import { useState } from "react"
import Button from "./ui/Button"
import Subtitle from "./font/Subtitle"
import Text from "./Font/Text"
import Input from "./ui/Input"
import Label from "./ui/Label"
import Card from "./ui/Card"
import Loading from "./Loading"
import { usePurchasesDraftContext } from "../hooks/PurchasesDraftContext"

const NotaFiscalSection = () => {

	const [value, setValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const handleChange = (e) => {setValue(e.target.value);};
	const {addMultiplePurchases} = usePurchasesDraftContext();
	const onSubmit = () => {
		setIsLoading(true);

		// request to backend with the URL
		setTimeout(() => {
			setIsLoading(false);
			// grab data
			// add data with addMultiplePurchases(data)
		}, 2000);
	}

	return (
		<Card style={{minWidth:"300px", flexShrink:1, padding:"2rem 1rem 4rem 1rem"}}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0rem', textAlign: 'center', marginBottom: '1.5rem' }}>
				<div style={{position:"relative", width:"fit-content", height:"fit-content", marginBottom:"1rem"}}>
					<img style={{position:"relative", zIndex:5, borderRadius:"100%"}} className="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,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"/>
					{isLoading && <Loading/>}
				</div>
				<Subtitle>Adicionar Gastos de Nota Fiscal</Subtitle>
				<Text.Default>Insira a URL da Nota Fiscal para registrar automaticamente seus gastos.</Text.Default>
			</div>
			<div style={{ marginBottom: '1.5rem' }}>
				<Label>
					URL da Nota Fiscal:
					<Input value={value} onChange={handleChange} placeholder="https://exemplo.com"/>
				</Label>
			</div>
			<Button.Submit onClick={onSubmit} disabled={!Boolean(value)}>Fazer consulta de compras</Button.Submit>
		</Card>
	)
}

export default NotaFiscalSection
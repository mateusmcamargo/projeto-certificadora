import { useState } from 'react'
import { Button, Input, Label } from '../ui/Ui';
import Font from '../font/Font';
import { Loading } from '../Components'
import { usePurchasesDraftContext } from '../../hooks/PurchasesDraftContext'
import './invoice.scss';

export function Invoice() {

	const [value, setValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => { setValue(e.target.value); };
	const { addMultiplePurchases } = usePurchasesDraftContext();

	const onSubmit = () => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			// backend request here...
		}, 2000);
	};

	return (
		<div className='block invoice'>
			<div className='header'>
				<div className='image-wrapper'>
					<i className='fa-solid fa-file-invoice-dollar'></i>
					{isLoading && <Loading />}
				</div>

				<div className="text">
					<Font.Title>Adicionar Nota Fiscal</Font.Title>
					<Font.Subtitle style={{textAlign: 'left'}}>Cole o link da nota fiscal,<br/>nós cuidamos do resto!</Font.Subtitle>
				</div>
			</div>

			<div className='input-block'>
				<Label>
					Link da nota fiscal:
					<Input 
						value={value} 
						onChange={handleChange} 
						placeholder='https://www.link-de-exemplo.com'
					/>
				</Label>
			</div>

			<Button.Submit onClick={onSubmit} disabled={!Boolean(value)}>
				<i className='fa-solid fa-magnifying-glass'></i>
				FAZER CONSULTA
			</Button.Submit>
		</div>
	);
}
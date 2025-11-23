import { useState } from 'react'
import { Button, Input, Label } from '../ui/Ui';
import Font from '../font/Font';
import { Loading } from '../Components'
import { usePurchasesDraftContext } from '../../hooks/PurchasesDraftContext'
import './invoice.scss';

export function Invoice() {

	const [value, setValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const { addMultiplePurchases } = usePurchasesDraftContext();

	const handleChange = (e) => { 
		setValue(e.target.value);
		setError(''); // Limpa erro ao digitar
		setSuccess(''); // Limpa sucesso ao digitar
	};

	const onSubmit = async () => {
		setIsLoading(true);
		setError('');
		setSuccess('');

		try {
			// Validação básica da URL
			if (!value.trim()) {
				throw new Error('Por favor, insira um link válido');
			}

			// Chama a função que consome a API
			const result = await addMultiplePurchases(value);

			if (result.success) {
				setSuccess(`${result.itemsAdded} ${result.itemsAdded === 1 ? 'item adicionado' : 'itens adicionados'} com sucesso!`);
				setValue(''); // Limpa o input após sucesso
				
				// Opcional: mostrar informações da nota
				if (result.nfceData) {
					console.log('Estabelecimento:', result.nfceData.estabelecimento);
					console.log('Valor total:', result.nfceData.valor_pagar);
				}
			} else {
				throw new Error(result.error || 'Erro ao processar a nota fiscal');
			}

		} catch (err) {
			console.error('Erro na consulta:', err);
			setError(err.message || 'Erro ao consultar a nota fiscal. Tente novamente.');
		} finally {
			setIsLoading(false);
		}
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
					<Font.Subtitle>Cole o link da sua nota fiscal que nós cuidamos do resto!</Font.Subtitle>
				</div>
			</div>

			<div className='input-block'>
				<Label>
					Link da nota fiscal:
				</Label>
				<Input 
					value={value}
					onChange={handleChange} 
					placeholder='https://www.fazenda.pr.gov.br/nfce/qrcode?p=...'
					disabled={isLoading}
				/>
			</div>

			{/* Mensagens de feedback */}
			{error && (
				<div className='message error' style={{
					color: '#ff4444',
					padding: '10px',
					marginBottom: '10px',
					borderRadius: '4px',
					backgroundColor: '#ffeeee',
					border: '1px solid #ffcccc'
				}}>
					<i className='fa-solid fa-circle-exclamation'></i> {error}
				</div>
			)}

			{success && (
				<div className='message success' style={{
					color: '#00aa00',
					padding: '10px',
					marginBottom: '10px',
					borderRadius: '4px',
					backgroundColor: '#eeffee',
					border: '1px solid #ccffcc'
				}}>
					<i className='fa-solid fa-circle-check'></i> {success}
				</div>
			)}

			<Button.Submit 
				onClick={onSubmit} 
				disabled={!Boolean(value) || isLoading}
			>
				{isLoading ? (
					<>
						<i className='fa-solid fa-spinner fa-spin'></i>
						PROCESSANDO...
					</>
				) : (
					<>
						<i className='fa-solid fa-magnifying-glass'></i>
						FAZER CONSULTA
					</>
				)}
			</Button.Submit>
		</div>
	);
}
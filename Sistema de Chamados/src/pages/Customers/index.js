import './customers.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiUser } from 'react-icons/fi'
import { useState } from 'react'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

export default function Customers() {
	const history = useHistory()
	const [customerData, setCustomerData] = useState({
		name: '',
		cnpj: '',
		adress: '',
	})

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			if (
				customerData.adress === '' ||
				customerData.name === '' ||
				customerData.cnpj === ''
			)
				throw new Error('Campo vazio')

			await firebase.firestore().collection('customers').add({
				nome_fantasia: customerData.name,
				cnpj: customerData.cnpj,
				endereço: customerData.adress,
			})
			toast.success('Cliente cadastrado com sucesso!')
			history.push('/dashboard')
		} catch (err) {
			console.log(err)
			toast.error('Houve algum erro.')
		}
	}

	const updateField = (e) => {
		setCustomerData({
			...customerData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<>
			<Header />
			<main className="content">
				<Title name="Clientes">
					<FiUser size={25} />
				</Title>

				<div className="customer-container">
					<form onSubmit={(e) => handleSubmit(e)}>
						<label>Nome fantasia</label>
						<input
							type="text"
							value={customerData.name}
							onChange={(e) => updateField(e)}
							name="name"
							required
						/>
						<label>CNPJ</label>
						<input
							type="tel"
							value={customerData.cnpj}
							onChange={(e) => updateField(e)}
							name="cnpj"
							required
						/>
						<label>Endereço</label>
						<input
							type="text"
							value={customerData.adress}
							onChange={(e) => updateField(e)}
							name="adress"
							required
						/>

						<button type="submit">Cadastrar</button>
					</form>
				</div>
			</main>
		</>
	)
}

import Header from '../../components/Header'
import Title from '../../components/Title'
import './new.css'
import firebase from '../../services/firebaseConnection'
import { useHistory, useParams } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify'

export default function New() {
	const { user } = useContext(AuthContext)
	const { id } = useParams()
	const history = useHistory()

	const [loadingCustomers, setLoadingCustomers] = useState(false)
	const [customers, setCustomers] = useState([])
	const [cliente, setCliente] = useState(0)
	const [assunto, setAssunto] = useState('Suporte')
	const [status, setStatus] = useState('Aberto')
	const [complemento, setComplemento] = useState('')
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		loadCustomers()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function loadCustomers() {
		try {
			setLoadingCustomers(true)
			let lista = []
			const snapshot = await firebase
				.firestore()
				.collection('customers')
				.get()
			snapshot.forEach((doc) => {
				lista.push({
					id: doc.id,
					nomeFantasia: doc.data().nome_fantasia,
				})
			})

			if (lista.length === 0) {
				throw new Error('Nenhuma empresa cadastrada.')
			}
			setCustomers(lista)
			if (id) {
				loadId(lista)
			}
		} catch (err) {
			console.log(err)
			setCustomers([{ id: '1', nomeFantasia: '' }])
			toast.error('Houve algum erro.')
		} finally {
			setLoadingCustomers(false)
		}
	}

	async function loadId(lista) {
		try {
			const snapshot = await firebase
				.firestore()
				.collection('chamados')
				.doc(id)
				.get()
			setAssunto(snapshot.data().assunto)
			setStatus(snapshot.data().status)
			setComplemento(snapshot.data().complemento)

			let index = lista.findIndex(
				(item) => item.id === snapshot.data().cliente_id
			)
			setCliente(index)
			setIsEditing(true)
		} catch (err) {
			console.log(err)
			toast.error('Houve algum erro.')
			setIsEditing(false)
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()

		if (isEditing) {
			try {
				await firebase
					.firestore()
					.collection('chamados')
					.doc(id)
					.update({
						cliente: customers[cliente].nomeFantasia,
						cliente_id: customers[cliente].id,
						assunto: assunto,
						status: status,
						complemento: complemento,
					})
				toast.success('Cliente atualizado com sucesso!')
			} catch (err) {
				console.log(err)
				toast.error('Houve algum erro.')
			}
		} else {
			try {
				await firebase.firestore().collection('chamados').add({
					created_at: new Date(),
					cliente: customers[cliente].nomeFantasia,
					cliente_id: customers[cliente].id,
					assunto: assunto,
					status: status,
					complemento: complemento,
					aberto_por: user.email,
				})
				toast.success('Cliente cadastrado com sucesso!')
			} catch (err) {
				console.log(err)
				toast.error('Houve algum erro.')
			}
		}

		history.push('/dashboard')
	}

	return (
		<>
			<Header />
			<main className="content">
				<Title name="Novo chamado">
					<FiPlus size={25} />
				</Title>

				<div className="new-container">
					<form onSubmit={(e) => handleSubmit(e)}>
						<label>Cliente</label>
						<select
							value={cliente}
							onChange={(e) => setCliente(e.target.value)}
						>
							{loadingCustomers ? (
								<option>Carregando...</option>
							) : (
								customers.map((item, index) => {
									return (
										<option key={item.id} value={index}>
											{item.nomeFantasia}
										</option>
									)
								})
							)}
						</select>

						<label>Assunto</label>
						<select
							value={assunto}
							onChange={(e) => setAssunto(e.target.value)}
						>
							<option value="Suporte">Suporte</option>
							<option value="Visita Tecnica">
								Visita Técnica
							</option>
							<option value="Financeiro">Financeiro</option>
						</select>

						<label>Status</label>
						<div className="radio-options">
							<div>
								<input
									type="radio"
									name="radio"
									value="Aberto"
									onChange={(e) => setStatus(e.target.value)}
									checked={status === 'Aberto'}
								/>
								<span>Aberto</span>
							</div>
							<div>
								<input
									type="radio"
									name="radio"
									value="Progresso"
									onChange={(e) => setStatus(e.target.value)}
									checked={status === 'Progresso'}
								/>
								<span>Progresso</span>
							</div>
							<div>
								<input
									type="radio"
									name="radio"
									value="Atendido"
									onChange={(e) => setStatus(e.target.value)}
									checked={status === 'Atendido'}
								/>
								<span>Atendido</span>
							</div>
						</div>

						<label>Complemento</label>
						<textarea
							type="text"
							placeholder="Descreva seu problema (opcional)."
							value={complemento}
							onChange={(e) => setComplemento(e.target.value)}
						/>

						<button type="submit">
							{isEditing ? 'Editar' : 'Registrar'}
						</button>
					</form>
				</div>
			</main>
		</>
	)
}

import './dashboard.css'
import firebase from '../../services/firebaseConnection'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Modal from '../../components/Modal'
import { FiEdit2, FiHome, FiPlus, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const SIZE_LIMIT = 5

export default function Dashboard() {
	const listRef = firebase
		.firestore()
		.collection('chamados')
		.orderBy('created_at', 'desc')

	const [chamados, setChamados] = useState([])
	const [loadingChamados, setLoadingChamados] = useState(true)
	const [lastDoc, setLastDoc] = useState()
	const [isEmpty, setIsEmpty] = useState(false)
	const [isDisabled, setIsDisabled] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [detail, setDetail] = useState()

	useEffect(() => {
		loadChamados()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (isEmpty) {
			setIsDisabled(true)
		}
	}, [isEmpty])

	async function loadChamados() {
		try {
			const snapshot = await listRef.limit(SIZE_LIMIT).get()
			updateState(snapshot)
		} catch (err) {
			console.log(err)
			toast.error('Houve algum erro.')
		} finally {
			setLoadingChamados(false)
		}
	}

	function updateState(snapshot) {
		if (!isEmpty) {
			let lista = []
			snapshot.forEach((doc) => {
				lista.push({
					id: doc.id,
					cliente: doc.data().cliente,
					assunto: doc.data().assunto,
					status: doc.data().status,
					criadoEm: format(
						doc.data().created_at.toDate(),
						'dd/MM/yyyy'
					),
					abertoPor: doc.data().aberto_por,
					complemento: doc.data().complemento,
				})
			})

			setIsEmpty(snapshot.size < SIZE_LIMIT)
			setLastDoc(snapshot.docs[snapshot.docs.length - 1])
			setChamados((chamados) => [...chamados, ...lista])
		}
	}

	async function handleMore() {
		try {
			const snapshot = await listRef
				.startAfter(lastDoc)
				.limit(SIZE_LIMIT)
				.get()
			updateState(snapshot)
		} catch (err) {
			console.log(err)
			toast.error('Houve algum erro.')
		} finally {
			setLoadingChamados(false)
		}
	}

	function toggleModal(item) {
		setShowModal(!showModal)
		setDetail(item)
	}

	if (loadingChamados) {
		return (
			<>
				<Header />
				<main className="content">
					<Title name="Chamados">
						<FiHome size={25} />
					</Title>
					<div className="dashboard-container">
						<span className="buscando">Buscando chamados...</span>
					</div>
				</main>
			</>
		)
	}

	return (
		<>
			<Header />
			<main className="content">
				<Title name="Chamados">
					<FiHome size={25} />
				</Title>
				<div className="dashboard-container">
					{chamados.length === 0 ? (
						<div className="empty">
							<Link className="new-btn" to="/new">
								<FiPlus size={25} />
								Novo chamado
							</Link>
							<span>Nenhum chamado registrado</span>
						</div>
					) : (
						<div className="full">
							<Link className="new-btn" to="/new">
								<FiPlus size={25} />
								Novo chamado
							</Link>

							<table>
								<thead>
									<tr>
										<th scope="col">Cliente</th>
										<th scope="col">Assunto</th>
										<th scope="col">Status</th>
										<th scope="col">Cadastrado em</th>
										<th scope="col">#</th>
									</tr>
								</thead>

								<tbody>
									{chamados.map((item, index) => {
										return (
											<tr key={index}>
												<td data-label="Cliente">
													{item.cliente}
												</td>
												<td data-label="Assunto">
													{item.assunto}
												</td>
												<td data-label="Status">
													<span
														className="badge"
														style={{
															backgroundColor:
																item.status ===
																'Aberto'
																	? '#5cb85c'
																	: '#999',
														}}
													>
														{item.status}
													</span>
												</td>
												<td data-label="Cadastrado">
													{item.criadoEm}
												</td>
												<td data-label="#">
													<div>
														<button
															style={{
																backgroundColor:
																	'#3583f6',
															}}
															onClick={() =>
																toggleModal(
																	item
																)
															}
														>
															<FiSearch
																size={17}
																color="#fff"
															/>
														</button>
														<Link
															style={{
																backgroundColor:
																	'#f6a935',
															}}
															to={`/new/${item.id}`}
														>
															<FiEdit2
																size={17}
																color="#fff"
															/>
														</Link>
													</div>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>

							<button
								id="btn_more"
								onClick={() => {
									handleMore()
								}}
								disabled={isDisabled}
							>
								Buscar mais
							</button>
						</div>
					)}
				</div>

				{showModal && <Modal conteudo={detail} close={toggleModal} />}
			</main>
		</>
	)
}

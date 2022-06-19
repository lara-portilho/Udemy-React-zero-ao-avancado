import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'

import api from '../../services/api'
import { Container, Form, SubmitButton, List, DeleteButton } from './styles'

export default function Main() {
	const [newRepo, setNewRepo] = useState('')
	const [repositories, setRepositories] = useState([])
	const [loading, setLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		const repoStorage = localStorage.getItem('@Projeto-Repos')

		if (repoStorage) {
			setRepositories(JSON.parse(repoStorage))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('@Projeto-Repos', JSON.stringify(repositories))
	}, [repositories])

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault()
			setLoading(true)

			async function submit() {
				try {
					if (newRepo === '')
						throw new Error('Preencha com um repositório válido.')

					const response = await api.get(`/repos/${newRepo}`)

					const hasRepo = repositories.find(
						(repo) => repo.name === newRepo
					)
					if (hasRepo) throw new Error('Repositório já adicionado.')

					const data = {
						name: response.data.full_name,
					}

					setRepositories([...repositories, data])
					setNewRepo('')
				} catch (err) {
					console.log(err)
					setHasError(true)
				} finally {
					setLoading(false)
				}
			}

			submit()
		},
		[newRepo, repositories]
	)

	const handleDelete = useCallback(
		(repo) => {
			const find = repositories.filter((r) => r.name !== repo)
			setRepositories(find)
		},
		[repositories]
	)

	return (
		<Container>
			<h1>
				<FaGithub size={25} />
				Meus Repositórios
			</h1>

			<Form onSubmit={(e) => handleSubmit(e)} error={hasError}>
				<input
					type="text"
					placeholder="usuário/repositório"
					value={newRepo}
					onChange={(e) => {
						setNewRepo(e.target.value)
						setHasError(false)
					}}
				/>

				<SubmitButton loading={loading ? 1 : 0}>
					{loading ? (
						<FaSpinner size={14} color="#fff" />
					) : (
						<FaPlus size={14} color="#fff" />
					)}
				</SubmitButton>
			</Form>

			<List>
				{repositories.map((repo) => (
					<li key={repo.name}>
						<span>
							<DeleteButton
								onClick={() => handleDelete(repo.name)}
							>
								<FaTrash size={14} />
							</DeleteButton>
							{repo.name}
						</span>

						<Link
							to={`/repositorio/${encodeURIComponent(repo.name)}`}
						>
							<FaBars size={20} />
						</Link>
					</li>
				))}
			</List>
		</Container>
	)
}

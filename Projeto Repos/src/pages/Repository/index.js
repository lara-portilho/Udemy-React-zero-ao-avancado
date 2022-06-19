import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	FaArrowLeft,
	FaArrowCircleLeft,
	FaArrowCircleRight,
} from 'react-icons/fa'

import api from '../../services/api'
import {
	Loading,
	Container,
	BackButton,
	Owner,
	FilterList,
	IssuesList,
	LabelList,
	PageActions,
} from './styles'

export default function Repository() {
	const { repository } = useParams()

	const [repo, setRepo] = useState({})
	const [issues, setIssues] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [filterIndex, setFilterIndex] = useState(0)
	const [filters, setFilters] = useState([
		{ state: 'all', label: 'Todas', active: true },
		{ state: 'open', label: 'Abertas', active: false },
		{ state: 'closed', label: 'Fechadas', active: false },
	])

	useEffect(() => {
		async function load() {
			try {
				const [repoResponse, issuesResponse] = await Promise.all([
					api.get(`/repos/${repository}`),
					api.get(`/repos/${repository}/issues`, {
						params: {
							state: filters.find((f) => f.active).state,
							page,
							per_page: 5,
						},
					}),
				])

				setIssues(issuesResponse.data)
				setRepo(repoResponse.data)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}

		load()
	}, [filters, page, repository])

	function handleFilter(i) {
		setFilterIndex(i)
		let newFilters = filters.map((filter, index) =>
			i === index
				? { ...filter, active: true }
				: { ...filter, active: false }
		)

		setFilters(newFilters)
	}

	function handlePage(action) {
		if (page !== 1 || action !== 'back') {
			setPage(action === 'back' ? page - 1 : page + 1)
		}
	}

	if (loading) {
		return (
			<Loading>
				<h1>Carregando...</h1>
			</Loading>
		)
	}

	return (
		<Container>
			<BackButton to="/">
				<FaArrowLeft size={35} color="#000" />
			</BackButton>

			<Owner>
				<img src={repo.owner.avatar_url} alt={repo.owner.login} />
				<h1>{repo.name}</h1>
				<p>{repo.description}</p>
			</Owner>

			<FilterList active={filterIndex}>
				{filters.map((filter, index) => (
					<button
						key={filter.label}
						type="button"
						onClick={() => handleFilter(index)}
					>
						{filter.label}
					</button>
				))}
			</FilterList>

			<IssuesList>
				{issues.map((issue) => (
					<li key={String(issue.id)}>
						<img
							src={issue.user.avatar_url}
							alt={issue.user.login}
						/>

						<div>
							<strong>
								<a href={issue.html_url}>{issue.title}</a>

								<LabelList>
									{issue.labels.map((label) => (
										<span key={String(label.id)}>
											{label.name}
										</span>
									))}
								</LabelList>
							</strong>

							<p>{issue.user.login}</p>
						</div>
					</li>
				))}
			</IssuesList>

			<PageActions>
				<button
					type="button"
					onClick={() => handlePage('back')}
					disabled={page < 2}
				>
					<FaArrowCircleLeft size={30} color="#000" />
				</button>
				<button type="button" onClick={() => handlePage('next')}>
					<FaArrowCircleRight size={30} color="#000" />
				</button>
			</PageActions>
		</Container>
	)
}

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MdFlightTakeoff } from 'react-icons/md'

import api from '../../services/api'
import { addReserveRequest } from '../../store/modules/reserve/actions'

import './style.css'

export default function Home() {
	const dispatch = useDispatch()
	const [trips, setTrips] = useState([])

	useEffect(() => {
		async function loadApi() {
			const res = await api.get('/trips')
			setTrips(res.data)
		}

		loadApi()
	}, [])

	function handleAdd(id) {
		dispatch(addReserveRequest(id))
	}

	return (
		<div>
			<div className="home-container">
				{trips.map((trip) => (
					<li key={trip.id}>
						<img src={trip.image} alt={trip.title} />
						<strong>{trip.title}</strong>
						<span className="status">
							Status:{' '}
							{trip.status ? 'Disponível' : 'Indisponível'}
						</span>

						<button
							type="button"
							onClick={() => handleAdd(trip.id)}
						>
							<div>
								<MdFlightTakeoff size={16} color="#fff" />
							</div>
							<span>Reservar</span>
						</button>
					</li>
				))}
			</div>
		</div>
	)
}

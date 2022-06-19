import { useSelector, useDispatch } from 'react-redux'
import { MdDelete, MdAddCircle, MdRemoveCircle } from 'react-icons/md'

import {
	removeReserve,
	updateAmountReserveRequest,
} from '../../store/modules/reserve/actions'

import './style.css'

export default function Reservas() {
	const dispatch = useDispatch()
	const reserves = useSelector((state) => state.reserve)

	function decrementAmount(trip) {
		dispatch(updateAmountReserveRequest(trip.id, trip.amount - 1))
	}
	function incrementAmount(trip) {
		dispatch(updateAmountReserveRequest(trip.id, trip.amount + 1))
	}

	return (
		<div>
			<h1 className="title">Você solicitou {reserves.length} reservas</h1>

			{reserves.map((reserve) => (
				<div className="reservas" key={reserve.id}>
					<img src={reserve.image} alt={reserve.title} />
					<strong>{reserve.title}</strong>

					<div id="amount">
						<button
							type="button"
							onClick={() => decrementAmount(reserve)}
						>
							<MdRemoveCircle size={20} color="#191919" />
						</button>
						<span>{reserve.amount}</span>
						<button
							type="button"
							onClick={() => incrementAmount(reserve)}
						>
							<MdAddCircle size={20} color="#191919" />
						</button>
					</div>

					<button
						type="button"
						onClick={() => dispatch(removeReserve(reserve.id))}
					>
						<MdDelete size={20} color="#191919" />
					</button>
				</div>
			))}
		</div>
	)
}

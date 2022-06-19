import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Reservas from './pages/Reservas'

export default function MyRouter() {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route path="/reservas" element={<Reservas />} />
		</Routes>
	)
}

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import AuthProvider from './contexts/auth'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<ToastContainer />
				<Routes />
			</BrowserRouter>
		</AuthProvider>
	)
}

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import MyRouter from './myRouter'
import Header from './components/Header'

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<MyRouter />
			</BrowserRouter>
		</Provider>
	)
}

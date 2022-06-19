import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import logo from '../../assets/logo.png'
import './signin.css'

export default function SignIn() {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	})

	const { signIn, loadingAuth } = useContext(AuthContext)

	const updateField = (e) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		})
	}

	function handleSubmit(e) {
		e.preventDefault()

		signIn(userData.email, userData.password)
	}

	return (
		<div className="login">
			<div className="login-container">
				<div className="login-logo_area">
					<img src={logo} alt="Sistema de Chamados - Logo" />
				</div>

				<form onSubmit={(e) => handleSubmit(e)}>
					<h1>Entrar</h1>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={userData.email}
						onChange={(e) => updateField(e)}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Senha"
						value={userData.password}
						onChange={(e) => updateField(e)}
						required
					/>
					<button type="submit" disabled={loadingAuth}>
						{loadingAuth ? 'Carregando' : 'Acessar'}
					</button>
				</form>

				<Link to="/register">Criar uma conta</Link>
			</div>
		</div>
	)
}

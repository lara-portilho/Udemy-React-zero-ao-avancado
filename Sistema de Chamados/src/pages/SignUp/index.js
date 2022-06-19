import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import logo from '../../assets/logo.png'
import './signup.css'

export default function SignUp() {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		confirm_password: '',
	})

	const { signUp, loadingAuth } = useContext(AuthContext)

	const updateField = (e) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		})
	}

	function handleSubmit(e) {
		e.preventDefault()

		if (userData.password === userData.confirm_password) {
			signUp(userData.email, userData.password, userData.name)
		} else {
			console.log('error')
		}
	}

	return (
		<div className="register">
			<div className="register-container">
				<div className="register-logo_area">
					<img src={logo} alt="Sistema de Chamados - Logo" />
				</div>

				<form onSubmit={(e) => handleSubmit(e)}>
					<h1>Cadastrar</h1>
					<input
						type="text"
						name="name"
						placeholder="Nome"
						value={userData.name}
						onChange={(e) => updateField(e)}
						required
					/>
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
					<input
						type="password"
						name="confirm_password"
						placeholder="Confirme a senha"
						value={userData.confirm_password}
						onChange={(e) => updateField(e)}
						required
					/>
					<button type="submit" disabled={loadingAuth}>
						{loadingAuth ? 'Carregando' : 'Cadastrar'}
					</button>
				</form>

				<Link to="/">Já tem uma conta? Entre</Link>
			</div>
		</div>
	)
}

import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import './header.css'
import avatar from '../../assets/avatar.png'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'

export default function Header() {
	const { user } = useContext(AuthContext)
	return (
		<div className="sidebar">
			<div>
				<img
					src={!!user.photoURL ? user.photoURL : avatar}
					alt="Avatar"
				/>
			</div>
			<Link to="/dashboard">
				<FiHome color="#efefef" size={24} />
				Chamados
			</Link>
			<Link to="/customers">
				<FiUser color="#efefef" size={24} />
				Clientes
			</Link>
			<Link to="/profile">
				<FiSettings color="#efefef" size={24} />
				Configurações
			</Link>
		</div>
	)
}

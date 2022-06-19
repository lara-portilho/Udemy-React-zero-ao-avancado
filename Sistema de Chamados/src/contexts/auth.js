import { useState, useEffect, createContext } from 'react'
import firebase from '../services/firebaseConnection'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loadingAuth, setLoadingAuth] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		function loadStorage() {
			const storageUser = localStorage.getItem(
				'@Sistema-de-Chamados.user'
			)

			if (storageUser) {
				setUser(JSON.parse(storageUser))
			}
			setLoading(false)
		}

		loadStorage()
	}, [])

	async function signIn(email, password) {
		setLoadingAuth(true)

		try {
			const value = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password)

			setUser(value.user)
			storageUser(value.user)
		} catch (err) {
			if (
				err.code === 'auth/user-disabled' ||
				err.code === 'auth/user-not-found' ||
				err.code === 'auth/invalid-email' ||
				err.code === 'auth/wrong-password'
			) {
				toast.error('Email/senha incorretos.')
			} else {
				toast.error('Houve algum erro.')
			}
			console.log(err)
		} finally {
			setLoadingAuth(false)
		}
	}

	async function signUp(email, password, name) {
		setLoadingAuth(true)

		try {
			const value = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)

			await value.user.updateProfile({
				displayName: name,
			})

			setUser(value.user)
			storageUser(value.user)
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				toast.error('Este email já está em uso!')
			} else if (err.code === 'auth/invalid-email') {
				toast.error('Email inválido!')
			} else if (err.code === 'auth/weak-password') {
				toast.error('Senha muito fraca, utilize 6 ou mais caracteres.')
			} else {
				toast.error('Houve algum erro.')
			}
			console.log(err)
		} finally {
			setLoadingAuth(false)
		}
	}

	async function signOut() {
		try {
			setLoadingAuth(true)
			await firebase.auth().signOut()
			localStorage.removeItem('@Sistema-de-Chamados.user')
			setUser(null)
		} catch (err) {
			toast.error('Houve algum erro.')
			console.log(err)
		} finally {
			setLoadingAuth(false)
		}
	}

	function storageUser(data) {
		localStorage.setItem('@Sistema-de-Chamados.user', JSON.stringify(data))
	}

	return (
		<AuthContext.Provider
			value={{
				signed: !!user,
				user,
				loading,
				loadingAuth,
				setLoadingAuth,
				signUp,
				signIn,
				signOut,
				setUser,
				storageUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

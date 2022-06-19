import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

export default function Profile() {
	const { user, signOut, loadingAuth, setUser, storageUser } =
		useContext(AuthContext)
	const [loadingUpdate, setLoadingUpdate] = useState(false)
	const [newData, setNewData] = useState({
		name: user.displayName,
		avatarURL: user.photoURL,
		avatarImg: null,
	})

	function handleFile(e) {
		if (e.target.files[0]) {
			const image = e.target.files[0]
			if (image.type === 'image/jpeg' || image.type === 'image/png') {
				setNewData({
					...user,
					avatarURL: URL.createObjectURL(image),
					avatarImg: image,
				})
			} else {
				toast.warn('Tipos aceitos: png e jpeg')
				return
			}
		}
	}

	function saveName(name) {
		if (name === null) throw new Error('Nome deve estar preenchido.')
		firebase.auth().onAuthStateChanged(async (u) => {
			if (u) {
				await u.updateProfile({
					displayName: newData.name,
				})
				setUser(u)
				storageUser(u)
			}
		})
	}

	function saveAvatar(avatar) {
		if (avatar === null) return
		firebase.auth().onAuthStateChanged(async (u) => {
			if (u) {
				await firebase
					.storage()
					.ref(`/users/${u.uid}/images/${avatar.name}`)
					.put(avatar)

				const imageURL = await firebase
					.storage()
					.ref(`/users/${u.uid}/images/${avatar.name}`)
					.getDownloadURL()

				await u.updateProfile({
					photoURL: imageURL,
				})

				setUser(u)
				storageUser(u)
			}
		})
	}

	function handleSubmit(e) {
		e.preventDefault()
		try {
			setLoadingUpdate(true)
			saveName(newData.name)
			saveAvatar(newData.avatarImg)
			console.log(firebase.auth().currentUser)
			toast.success('Salvo com sucesso!')
		} catch (err) {
			toast.error('Houve algum erro.')
			console.log(err)
		} finally {
			setLoadingUpdate(false)
		}
	}

	const updateField = (e) => {
		setNewData({
			...newData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<>
			<Header />
			<main className="content">
				<Title name="Meu perfil">
					<FiSettings size={25} />
				</Title>

				<div className="profile-container">
					<form onSubmit={(e) => handleSubmit(e)}>
						<label className="profile-label_avatar">
							<input
								type="file"
								accept="image/*"
								onChange={(e) => handleFile(e)}
							/>
							<span>
								<FiUpload color="#fff" size={25} />
							</span>
							{user.photoURL === null ? (
								<img src={avatar} alt="Foto de perfil" />
							) : (
								<img
									src={newData.avatarURL}
									alt="Foto de perfil"
								/>
							)}
						</label>
						<div className="profile-text_labels">
							<label>Nome</label>
							<input
								type="text"
								value={newData.name}
								name="name"
								onChange={(e) => updateField(e)}
								required
							/>
							<label>Email</label>
							<input type="email" value={user.email} disabled />

							<button type="submit" disabled={loadingUpdate}>
								{loadingUpdate ? 'Carregando' : 'Salvar'}
							</button>
						</div>
					</form>

					<button
						id="logout_button"
						onClick={() => signOut()}
						disabled={loadingAuth}
					>
						{loadingAuth ? 'Carregando' : 'Sair'}
					</button>
				</div>
			</main>
		</>
	)
}

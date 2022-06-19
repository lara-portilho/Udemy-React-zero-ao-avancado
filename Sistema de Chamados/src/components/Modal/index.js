import './modal.css'
import { FiX } from 'react-icons/fi'

export default function Modal({ conteudo, close }) {
	return (
		<main className="modal">
			<div className="modal-container">
				<div id="modal-title">
					<h2>Detalhes</h2>
					<button className="close" onClick={close}>
						<FiX size={23} color="#fff" />
					</button>
				</div>

				<div className="grid-container">
					<span className="box1">
						<strong>Cliente: </strong>
						{conteudo.cliente}
					</span>
					<span className="box2">
						<strong>Assunto: </strong>
						{conteudo.assunto}
					</span>
					<span className="box3">
						<strong>Status: </strong>
						<span
							style={{
								backgroundColor:
									conteudo.status === 'Aberto'
										? '#5cb85c'
										: '#999',
							}}
							className="badge"
						>
							{conteudo.status}
						</span>
					</span>
					<span className="box4">
						<strong>Aberto por: </strong>
						{conteudo.abertoPor}
					</span>
					<span className="box5">
						<strong>Criado em: </strong>
						{conteudo.criadoEm}
					</span>

					{conteudo.complemento !== '' && (
						<span className="box6">
							<strong>
								Complemento:
								<br />
							</strong>
							<p id="overflow-complemento">
								{conteudo.complemento}
							</p>
						</span>
					)}
				</div>
			</div>
		</main>
	)
}

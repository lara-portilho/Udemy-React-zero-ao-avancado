import React, { Component } from 'react';
import './App.css'
import biscoitoImg from './assets/biscoito.png';
import frasesJson from './assets/frases.json';

class App extends Component{

	constructor(props){
		super(props);

		this.state = {
			fraseDisplay: ''
		};

		this.frases = frasesJson.frases;
		this.geraFrase = this.geraFrase.bind(this);
	}

	geraFrase(event){
		event.preventDefault();

		let state = this.state;
		let randNumber = Math.floor(Math.random() * this.frases.length);

		state.fraseDisplay = `"${this.frases[randNumber]}"`;

		this.setState(state);
	}

	render(){
		return(
			<div className="container">

				<h1 className="title">Biscoito da Sorte!</h1>
				<h2 className="description">
					Clique no biscoito abaixo para gerar uma mensagem
				</h2>

				<Biscoito action={this.geraFrase}/>
				<h3 className="fortune">{this.state.fraseDisplay}</h3>

				<p className="credits">Frases:&nbsp;
					<a href="https://www.blogdocasamento.com.br/70-frases-para-seus-biscoitos-da-sorte/">
						Blog do Casamento</a>
				</p>

			</div>
		);
  	}
}

class Biscoito extends Component{
	render(){
		return(
			<>

			<input type="image" src={biscoitoImg} name="Biscoito da Sorte"
				alt="Biscoito da Sorte" className="imagem"
				onClick={this.props.action}
			/>

			</>
		);
	}
}

/* <ul>
  {frases.map(s => (<li key={s}>{s}</li>))}
</ul> */

export default App;
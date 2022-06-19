import './styles.css';
import { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

export default function Filme() {
    const { id } = useParams();
    const history = useHistory();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    const [salvo, setSalvo] = useState(false);

    useEffect(() => {
        async function loadFilme() {
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if (response.data.length === 0 || isNaN(id)) {
                history.replace('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }

        const listaSalvos = localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(listaSalvos) || [];
        const isSalvo = filmesSalvos.some(filmeSalvo => filmeSalvo.id === filme.id);
        setSalvo(isSalvo);

        loadFilme();

    }, [history, id, filme.id]);

    function salvarFilme() {
        const listaSalvos = localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(listaSalvos) || [];

        if (salvo) {
            alert("Filme já salvo.");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        setSalvo(true);
    }

    function BotaoSalvar() {
        if (salvo) {
            return (
                <button disabled
                    className="mainBtn">
                    Salvo
                </button>
            );
        }

        return (
            <button onClick={salvarFilme}
                className="mainBtn">
                Salvar
            </button>
        );

    }

    if (loading) return <h3 className="carregando">Carregando...</h3>;

    return (
        <div className="filmeData">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            <p>{filme.sinopse}</p>

            <div className="botoes">
                <button className="voltar">
                    <Link to='/'>
                        Voltar
                    </Link>
                </button>

                <BotaoSalvar />

                <button className="mainBtn">
                    <a href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}
                        target="_blank"
                        rel="noreferrer">
                        Pesquisar Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}
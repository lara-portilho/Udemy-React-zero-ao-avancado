import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get('r-api/?api=filmes');
            setFilmes(response.data);
            setLoading(false);
        }

        loadFilmes();
    }, []);

    if (loading) return <h3 className="carregando">Carregando...</h3>;

    return (
        <div className="container">
            <div className="listaFilmes">
                {filmes.map(filme => {
                    return (
                        <article key={filme.id}>
                            <h2>{filme.nome}</h2>
                            <img src={filme.foto} alt={filme.nome} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}
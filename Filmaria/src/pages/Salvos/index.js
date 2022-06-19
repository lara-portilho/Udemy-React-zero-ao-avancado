import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Salvos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const listaSalvos = localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(listaSalvos) || [];
        setFilmes(filmesSalvos);

    }, []);

    function handleDeleteSingle(id) {
        let filtroFilmes = filmes.filter(filme => {
            return (filme.id !== id);
        });
        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
    }

    function handleDeleteAll() {
        setFilmes([]);
        localStorage.clear();
    }

    return (
        <div className="containerSalvos">
            <div className="botoes">
                <button>
                    <Link to='/'>
                        Home
                    </Link>
                </button>
                <button onClick={handleDeleteAll}>
                    Limpar lista
                </button>
            </div>

            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <h2>Sua lista está vazia!</h2>}

            <div className="listaFilmes">
                <ul>
                    {filmes.map(filme => {
                        return (
                            <li key={filme.id}>
                                <span>{filme.nome}</span>
                                <div>
                                    <Link to={`/filme/${filme.id}`}>
                                        Ver detalhes
                                    </Link>
                                    <button onClick={() => handleDeleteSingle(filme.id)}>
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
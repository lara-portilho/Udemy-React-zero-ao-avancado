import { Link } from 'react-router-dom';
import './styles.css';

export default function Erro() {
    return (
        <div className="erro">
            <h1>404</h1>
            <h2>Esta página não existe!</h2>
            <Link to='/'>Home</Link>
        </div>
    );
}
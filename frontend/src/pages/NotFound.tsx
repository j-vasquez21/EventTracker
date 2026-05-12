import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link to={'/'}>
                <button>Home</button>
            </Link>
        </div>
    );
};
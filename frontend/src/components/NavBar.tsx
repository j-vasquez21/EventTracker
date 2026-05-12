import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className="navBar">
            <div className="navBar-logo">
                <Link to="/" style={{ color: 'inherit' }}>EventTracker</Link>
            </div>
            <div className="navBar-right">
                {
                    isAuthenticated ? (
                        <>
                            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Hello, {user?.name}</span>
                            <Link to="/">Dashboard</Link>
                            <button className="secondary" onClick={handleLogout} style={{ padding: '6px 12px' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register"><button className="primary" style={{ padding: '6px 12px' }}>Sign Up</button></Link>
                        </>
                    )
                }
            </div>
        </nav>
    );
}
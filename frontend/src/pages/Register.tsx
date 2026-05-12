import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await register({ name, email, password });
            navigate('/');
        }
        catch (err: any) {
            console.error(err);
            setError(err.response?.data?.msg || 'Failed to register');
        }
    }

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '60px' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Create an Account</h2>
                {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            required 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            required 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            placeholder="At least 8 characters"
                        />
                    </div>
                    <button type="submit" className="primary" style={{ width: '100%', marginTop: '8px' }}>
                        Sign Up
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    );
};
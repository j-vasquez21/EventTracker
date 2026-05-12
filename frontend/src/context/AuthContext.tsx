import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';

type User = {
    id: string,
    email: string,
    name: string
}

type AuthContextType = {
    user: User | null,
    login: (credentials: { email: string, password: string }) => void,
    register: (userData: { name: string, email: string, password: string }) => void,
    logout: () => void,
    isAuthenticated: boolean
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children } : { children: ReactNode }) {
    // start off with token and user being unknown
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: { email: string, password: string }) => {
        try {
            const res = await api.post('/auth/login', credentials);
            const userData = res.data.user;
            setUser(userData);
            // this will set a key-value pair (user: userData)
            localStorage.setItem('user', JSON.stringify(userData));
        }
        catch (err) {
            console.error('Login attempt failed: ', err);
            throw err;
        }
    };

    const register = async (userData: { name: string, email: string, password: string }) => {
        try {
            const res = await api.post('/auth/register', userData);
            const returnedUser = res.data.user;
            setUser(returnedUser);
            localStorage.setItem('user', JSON.stringify(returnedUser));
        }
        catch (err) {
            console.error('Registration attempt failed: ', err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        }
        catch (err) {
            console.error('Log out request failed', err);
            throw err;
        }
        finally {
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    if (isLoading) return null;

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user} }>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context == undefined) throw new Error('useAuth must be within an AuthProvider');
    return context;
}
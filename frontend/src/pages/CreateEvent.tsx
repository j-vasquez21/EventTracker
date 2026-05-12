import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm, { type EventData } from '../components/EventForm';
import api from '../services/api';

export default function CreateEvent() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (data: EventData) => {
        setIsLoading(true);
        setError('');
        try {
            await api.post('/events', data);
            navigate('/');
        } catch (err: any) {
            console.error('Failed to create event', err);
            setError(err.response?.data?.msg || 'Failed to create event');
            setIsLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '40px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '24px' }}>Create New Event</h2>
                {error && <div style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</div>}
                <EventForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </div>
    );
}

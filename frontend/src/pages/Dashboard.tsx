import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import EventCard, { type Event } from '../components/EventCard';

export default function Dashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            const data = res.data.events || res.data;
            setEvents(Array.isArray(data) ? data : []);
        } catch (err: any) {
            console.error('Failed to fetch events', err);
            setError('Failed to load events');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/events/${id}`);
            setEvents(events.filter(e => e.id !== id));
        } catch (err) {
            console.error('Failed to delete event', err);
            alert('Failed to delete event');
        }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2>Your Events</h2>
                <Link to="/events/new">
                    <button className="primary">+ Create Event</button>
                </Link>
            </div>

            {error && <div style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</div>}

            {isLoading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                    <p style={{ color: 'var(--text-muted)' }}>You don't have any events yet.</p>
                    <Link to="/events/new">
                        <button className="primary" style={{ marginTop: '16px' }}>Create your first event</button>
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {events.map(event => (
                        <EventCard key={event.id} event={event} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm, { type EventData } from '../components/EventForm';
import api from '../services/api';
import { type Event } from '../components/EventCard';

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const [eventData, setEventData] = useState<EventData | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Since there is no get by id route, we fetch all and filter
                const res = await api.get('/events');
                const events: Event[] = res.data.events || res.data || [];
                const foundEvent = events.find((e: Event) => e.id === id);
                if (foundEvent) {
                    setEventData(foundEvent);
                } else {
                    setError('Event not found');
                }
            } catch (err: any) {
                console.error('Failed to fetch event', err);
                setError('Failed to fetch event data');
            } finally {
                setIsFetching(false);
            }
        };

        if (id) {
            fetchEvent();
        }
    }, [id]);

    const handleSubmit = async (data: EventData) => {
        setIsLoading(true);
        setError('');
        try {
            await api.put(`/events/${id}`, data);
            navigate('/');
        } catch (err: any) {
            console.error('Failed to update event', err);
            setError(err.response?.data?.msg || 'Failed to update event');
            setIsLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '40px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '24px' }}>Edit Event</h2>
                {error && <div style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</div>}
                
                {isFetching ? (
                    <p>Loading event data...</p>
                ) : eventData ? (
                    <EventForm initialData={eventData} onSubmit={handleSubmit} isLoading={isLoading} />
                ) : null}
            </div>
        </div>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
}

interface EventCardProps {
    event: Event;
    onDelete: (id: string) => void;
}

export default function EventCard({ event, onDelete }: EventCardProps) {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            onDelete(event.id);
        }
    }

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ margin: 0, color: 'var(--accent)' }}>{event.title}</h3>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                <div style={{ marginBottom: '4px' }}>📍 {event.location}</div>
                <div>🕒 {formattedDate}</div>
            </div>
            {event.description && <p style={{ fontSize: '14px', margin: 0, whiteSpace: 'pre-wrap' }}>{event.description}</p>}
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '16px' }}>
                <Link to={`/events/${event.id}/edit`}>
                    <button className="secondary" style={{ padding: '6px 12px' }}>Edit</button>
                </Link>
                <button className="danger" onClick={handleDelete} style={{ padding: '6px 12px' }}>Delete</button>
            </div>
        </div>
    );
}

import React, { useState } from 'react';

export interface EventData {
    title: string;
    description: string;
    date: string;
    location: string;
}

interface EventFormProps {
    initialData?: EventData;
    onSubmit: (data: EventData) => void;
    isLoading: boolean;
}

export default function EventForm({ initialData, onSubmit, isLoading }: EventFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [date, setDate] = useState(initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : '');
    const [location, setLocation] = useState(initialData?.location || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, date: new Date(date).toISOString(), location });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Event Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="E.g., Team Meeting" />
            </div>
            <div className="form-group">
                <label>Date & Time</label>
                <input type="datetime-local" required value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Location</label>
                <input type="text" required value={location} onChange={e => setLocation(e.target.value)} placeholder="Online, Conference Room, etc." />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Details about the event..." />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="submit" className="primary" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Event'}
                </button>
            </div>
        </form>
    );
}

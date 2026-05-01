import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const eventController = {
    // CREATE
    async createEvent(req: Request, res: Response) {
        try {
            const { title, description, date, location } = req.body;
            const userId = req.user.userId;

            if (!title || !date || !location) {
                return res.status(400).json({ msg: 'Must enter a title, date, and location'});
            }

            const newEvent = await prisma.event.create({
                data: {
                    title,
                    description,
                    date: new Date(date),
                    location,
                    userId: userId!
                }
            });

            res.status(201).json(newEvent);
        }
        catch (err) {
            res.status(500).json({msg: 'Error creating event', err});
        }
    },

    // READ ALL
    async getUserEvents(req: Request, res: Response) {
        try {
            const userId = req.user.userId;
            const events = prisma.event.findMany({
                where: { userId },
                orderBy: { date: 'asc' }
            });
            res.status(200).json(events);
        }
        catch (err) {
            res.status(500).json({ msg: 'Error getting all events', err});
        }
    },

    // UPDATE
    async updateEvent(req: Request, res: Response) {
        try {
            // get event :id
            const { id } = req.params;
            const { title, description, date, location } = req.body;
            const userId = req.user.userId;

            const event = await prisma.event.findFirst({
                where: { 
                    id: id as string,
                    userId: userId as string 
                }
            });

            if (!event) return res.status(404).json({ msg: 'Event not found' });


            const updatedEvent = await prisma.event.update({
                where: { id: id as string },
                data: {
                    title: title ?? event.title,
                    description: description ?? event.description,
                    date: date ? new Date(date) : event.date,
                    location: location ?? event.location
                }
            });

            res.status(200).json({updatedEvent});
        }
        catch (err) {
            res.status(500).json({ msg: 'Error updating event', err });
        }
    },

    // DELETE
    async deleteEvent(req:Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;

            const event = await prisma.event.findFirst({
                where: {id: id as string, userId: userId as string }
            });

            if (!event) return res.status(404).json({ msg: 'Event not found'}); 

            await prisma.event.delete({ where: { id: id as string } });

            res.status(200).json({ msg: 'Event deleted successfully' });
        } 
        catch (err) {
            res.status(500).json({ msg: 'Error deleting event', err});
        } 
    }
};
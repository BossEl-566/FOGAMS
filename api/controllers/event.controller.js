import Event from "../models/event.model.js";
import { errorHandler } from "../utils/error.js";


export const createEvent = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not authorized to perform this action'));
    }
    if (!req.body.title || !req.body.description || !req.body.date || !req.body.location || !req.body.imageUrl) {
        return next(errorHandler(400, 'Title, description, startDate and endDate are required'));
    }
    // Generate slug
    const slug = req.body.title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with dashes
        .replace(/[^a-z0-9-]/g, '')  // Remove special characters
        .replace(/--+/g, '-');       // Avoid multiple dashes

    const newEvent = new Event({
        ...req.body, slug
    });

    try {
        const event = await newEvent.save();
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }

};
import Event from "../models/event.model.js";
import { errorHandler } from "../utils/error.js";


export const createEvent = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not authorized to perform this action'));
    }
    if (!req.body.title || !req.body.description || !req.body.date || !req.body.location) {
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

export const getEvents = async (req, res, next) => {
    try {
        const DEFAULT_LIMIT = 10;

        // Parse query parameters
        const startIndex = parseInt(req.query.startIndex, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
        const sortDirection = req.query.order === "asc" ? 1 : -1;

        // Build query dynamically
        const query = {
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.eventId && { _id: req.query.eventId }),
            ...(req.query.searchText && { $text: { $search: req.query.searchText } }),
        };

        // Fetch events with pagination and sorting
        const events = await Event.find(query)
            .sort({ date: sortDirection })
            .skip(startIndex)
            .limit(limit);

        // Fetch additional metadata
        const totalEvents = await Event.countDocuments(query);

        // Calculate last month's events
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthCount = await Event.countDocuments({
            date: { $gte: oneMonthAgo },
        });

        // Send response
        res.status(200).json({
            data: events,
            meta: {
                total: totalEvents,
                lastMonthCount,
                startIndex,
                limit,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not authorized to perform this action'));
    }

    try {
        const event = await Event.findByIdAndDelete(req.params.eventId);
        if (!event) {
            return next(errorHandler(404, 'Event not found'));
        }
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};

export const getEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return next(errorHandler(404, 'Event not found'));
        }
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};

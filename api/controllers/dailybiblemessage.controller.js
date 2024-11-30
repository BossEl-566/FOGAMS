import DailyBibleMessage from "../models/dailybiblemessage.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not authorized to perform this action'));
    }
    if(!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Title and content are required'));
    }
    const slug = req.body.title.split(' ').join('').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
    const newDailyBibleMessage = new DailyBibleMessage({
        ...req.body, slug, userId: req.user.id
    }
    );
    try {
        const dailyBibleMessage = await newDailyBibleMessage.save();
        res.status(201).json(dailyBibleMessage);
        
        
    } catch (error) {
        next(error)
        
    }
};
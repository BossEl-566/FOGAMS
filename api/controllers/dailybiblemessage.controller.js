import DailyBibleMessage from "../models/dailybiblemessage.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => { 
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not authorized to perform this action'));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Title and content are required'));
    }

    // Generate slug
    const slug = req.body.title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with dashes
        .replace(/[^a-z0-9-]/g, '')  // Remove special characters
        .replace(/--+/g, '-');       // Avoid multiple dashes

    const newDailyBibleMessage = new DailyBibleMessage({
        ...req.body, slug, userId: req.user.id
    });

    try {
        const dailyBibleMessage = await newDailyBibleMessage.save();
        res.status(201).json(dailyBibleMessage);
    } catch (error) {
        next(error);
    }
};


export const getDailyBibleMessage = async (req, res, next) => {
     try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const dailyBibleMessage = await DailyBibleMessage.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.dailyBibleMessageId && { _id: req.query.dailyBibleMessageId }),
            ...(req.query.searchText && {
                $or: [
                    { title: { $regex: req.query.searchText, $options: 'i' } },
                    { content: { $regex: req.query.searchText, $options: 'i' } }
                ]
            }),

            }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

            const totalDailyMessage = await DailyBibleMessage.countDocuments();
            const now = new Date();
            const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

            const lastMonthDailyMessage = await DailyBibleMessage.find({
                createdAt: { $gte: oneMonthAgo }
            });
            res.status(200).json({ dailyBibleMessage, totalDailyMessage, lastMonthDailyMessage: lastMonthDailyMessage.length });

     } catch (error) {
        next(error)
        
     }
};   

export const deleteDailyBibleMessage = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not authorized to delete this message'));
    }
    try {
        await DailyBibleMessage.findByIdAndDelete(req.params.dailyBibleMessageId);
        res.status(200).json({ message: 'Daily Bible Message deleted successfully' });
    } catch (error) {
        next(error)
        
    }
};

export const updateDailyBibleMessage = async (req, res, next) => {
    try {
        // Authorization check
        if (!req.user.isAdmin || req.user.id !== req.params.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this message' });
        }

        // Update the message
        const updatedMessage = await DailyBibleMessage.findByIdAndUpdate(
            req.params.dailyBibleMessageId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                },
            },
            { new: true } // Return the updated document
        );

        // Check if the document exists
        if (!updatedMessage) {
            return res.status(404).json({ message: 'Daily Bible Message not found' });
        }

        // Success response
        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error('Error updating daily Bible message:', error); // Debugging logs
        next(error); // Pass error to middleware
    }
};

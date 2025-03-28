import Anonymous from "../models/anonymous.model.js";
import { errorHandler } from "../utils/error.js";

export const createMessage = async (req, res, next) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    if (!req.body.message) {
        return next(errorHandler(400, "Message is required"));
    }

    const { message } = req.body;

    try {
        const anonymousMessage = new Anonymous({ message });
        await anonymousMessage.save();
        res.status(201).json(anonymousMessage);
    } catch (error) {
        next(error);
    }
};

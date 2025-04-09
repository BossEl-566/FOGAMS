import Notepad from "../models/notepad.model.js";
import { errorHandler } from "../utils/error.js";



export const createNotepad = async (req, res, next) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    const { title, content, userId, isFavorite } = req.body;

    if (!title || !userId) {
        return next(errorHandler(400, "Title and userId are required"));
    }

    try {
        const notepad = new Notepad({ title, content, userId, isFavorite });
        await notepad.save();
        res.status(201).json(notepad);
    } catch (error) {
        next(error);
    }
}
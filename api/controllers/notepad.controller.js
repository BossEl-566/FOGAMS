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


export const getNotepad = async (req, res, next) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    try {
        
        const notepads = await Notepad.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notepads);
    } catch (error) {
        next(error);
    }
}

export const viewNotepad = async (req, res, next) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    try {
        const notepad = await Notepad.findById(req.params.notepadId);
        res.status(200).json(notepad);
    } catch (error) {
        next(error);
    }
}

export const deleteNotepad = async (req, res, next) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    try {
        const deletedNotepad = await Notepad.findByIdAndDelete(req.params.notepadId);

        if (!deletedNotepad) {
            return next(errorHandler(404, "Notepad not found"));
        }

        res.status(200).json({ message: "Notepad deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export const patchNotepad = async (req, res, next) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    try {
        const notepad = await Notepad.findById(req.params.notepadId);
        if (!notepad) {
            return next(errorHandler(404, "Notepad not found"));
        }

        // Check if isFavorite is in the request body
        const { isFavorite } = req.body;
        if (typeof isFavorite !== "boolean") {
            return next(errorHandler(400, "Invalid value for isFavorite"));
        }

        // Update only isFavorite
        const updatedNotepad = await Notepad.findByIdAndUpdate(
            req.params.notepadId,
            { isFavorite },
            { new: true }
        );

        res.status(200).json(updatedNotepad);
    } catch (error) {
        next(error);
    }
};



export const updateNotepad = async (req, res, next) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    try {
        const notepad = await Notepad.findById(req.params.notepadId);
        if (!notepad) {
            return next(errorHandler(404, "Notepad not found"));
        }

        const { title, content, isFavorite } = req.body;

        const updatedNotepad = await Notepad.findByIdAndUpdate(
            req.params.notepadId,
            { title, content, isFavorite },
            { new: true }
        );

        res.status(200).json(updatedNotepad);
    } catch (error) {
        next(error);
    }
};

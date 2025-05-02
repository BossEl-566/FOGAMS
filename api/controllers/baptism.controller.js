import Baptism from "../models/baptism.model.js";
import { errorHandler } from "../utils/error.js";




export const createBaptism = async (req, res, next) => { 
    if (!req.user.isMember) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    
    try {
        const { username, userID, age } = req.body;

        // Validate required fields
        if (!username || !userID) {
            return next(errorHandler(400, 'All fields are required'));
        }

        // Create a new baptism record
        const newBaptism = new Baptism({
            username,
            userID,
            age,
        });

        await newBaptism.save();
        res.status(201).json(newBaptism);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const getApplicants = async (req, res) => {
    if (!req.user.isMember) {
        return next(errorHandler(403, 'You are not allowed to perform this task'));
    }
    try {
        const baptism = await Baptism.find().sort({ createdAt: -1 });
        res.status(200).json(baptism);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const baptizeApplicant = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'You are not allowed to perform this task' });
    }
    try {
        const updatedBaptism = await Baptism.findByIdAndUpdate(
            req.params.applicantId,
            { $set: { isBaptized: true } },
            { new: true }
        );

        if (!updatedBaptism) {
            return res.status(404).json({ message: 'Baptism record not found' });
        }

        return res.status(200).json(updatedBaptism);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

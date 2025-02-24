import Membership from '../models/membership.model.js';
import { errorHandler } from '../utils/error.js';

export const createMembership = async (req, res, next) => {
    const { fullname, contact, email, userId } = req.body;

    if (!fullname || !contact || !email) {
        return next(errorHandler(400, "Name, contact, and email are required"));
    }

    try {
        const newMembership = new Membership({
            fullname, // Ensure correct field name
            contact,
            email,
            userId
        });

        const membership = await newMembership.save();
        res.status(201).json(membership);
    } catch (error) {
        next(error);
    }
};


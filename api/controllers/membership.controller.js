import Membership from '../models/membership.model.js';
import { errorHandler } from '../utils/error.js';

export const createMembership = async (req, res, next) => {
    const { fullname, contact, email, userId, birthDay, birthMonth } = req.body;

    if (!fullname || !contact || !email || !userId || !birthDay || !birthMonth) {
        return next(errorHandler(400, "Name, contact, and email are required"));
    }

    try {
        const newMembership = new Membership({
            fullname, 
            contact,
            email,
            userId,
            birthDay,
            birthMonth,
        });

        const membership = await newMembership.save();
        res.status(201).json(membership);
    } catch (error) {
        next(error);
    }
};

export const getMembership = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to view this page'));
    }
    try {
        const membership = await Membership.find().sort({ createdAt: -1 });
        res.status(200).json(membership);
    } catch (error) {
        next(error);
    }
}

export const updateMembership = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized to perform this action"));
    }
    try {
        const updatedMembership = await Membership.findByIdAndUpdate(
            req.params.membershipId,
            {
                $set: {
                    member: true, // ✅ Set member to true
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedMembership) {
            return next(errorHandler(404, "Membership not found"));
        }

        res.status(200).json(updatedMembership);
    } catch (error) {
        return next(errorHandler(400, "Failed to update membership"));
    }
};

export const deleteMembership = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized to perform this action"));
    }
    try {
        await Membership.findByIdAndDelete(req.params.membershipId);
        res.status(200).json({ message: "Membership has been deleted" });
    } catch (error) {
        next(error);
    }
}


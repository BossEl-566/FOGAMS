import Membership from '../models/membership.model.js';
import { errorHandler } from '../utils/error.js';
import fetch from 'node-fetch';

// CREATE
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

// GET ALL
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
};

// UPDATE
export const updateMembership = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized to perform this action"));
    }
    try {
        const updatedMembership = await Membership.findByIdAndUpdate(
            req.params.membershipId,
            {
                $set: {
                    member: true,
                },
            },
            { new: true }
        );

        if (!updatedMembership) {
            return next(errorHandler(404, "Membership not found"));
        }

        res.status(200).json(updatedMembership);
    } catch (error) {
        return next(errorHandler(400, "Failed to update membership"));
    }
};

// DELETE
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
};

// BIRTHDAY SMS CONTROLLER
export const sendBirthdaySMS = async (req, res, next) => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    try {
        const birthdayMembers = await Membership.find({
            birthDay: day,
            birthMonth: month,
        });

        if (birthdayMembers.length === 0) {
            return res.status(200).json({ message: "No birthdays today." });
        }

        for (const member of birthdayMembers) {
            const response = await fetch("https://sms.arkesel.com/api/v2/sms/send", {
                method: "POST",
                headers: {
                    "api-key": process.env.ARKESEL_API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: "FOGA_PEDU",
                    message: `Happy Birthday ${member.fullname}! 🎉 We love and celebrate you - From FOGA Church 💙`,
                    recipients: [`233${member.contact.slice(-9)}`],
                }),
            });

            const result = await response.json();
            console.log(`Message sent to ${member.fullname}`, result);
        }
        if (res && res.status === 'success') {
            console.log('Message sent to', response.data[0].recipient);
        }
        
    } catch (error) {
        console.error("Error sending birthday SMS:", error);
        
    }
};

export const getTodayBirthdays = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized to perform this action"));
    }
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
  
    try {
      const members = await Membership.find({
        birthDay: day,
        birthMonth: month,
      });
  
      res.status(200).json(members);
    } catch (error) {
        console.error("Error fetching today's birthdays:", error);
        res.status(500).json({ message: "Internal server error" });
    }
  };
  

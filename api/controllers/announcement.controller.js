
import Announcement from "../models/announcement.model.js";
import { errorHandler } from "../utils/error.js";


export const createAnnouncement = async (req, res, next) => {
    if (!req.user.isAdmin && !req.user.isDeptHead) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    if (!req.body.title || !req.body.description || !req.body.userId || !req.body.username) {
        return next(errorHandler(400, "All fields are required"));
    }

    const { title, description, date, userId, username } = req.body;

    try {
        const newAnnouncement = new Announcement({ title, description, date, userId, username });
        await newAnnouncement.save();
        res.status(201).json(newAnnouncement);
    } catch (error) {
        next(error);
    }
}

export const getAnnouncement = async (req, res, next) => {
    if(!req.user.isMember && !req.user.isAdmin && !req.user.isDeptHead) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.status(200).json(announcements);
    } catch (error) {
        next(error);
    }
}

export const deleteAnnouncement = async (req, res, next) => {
    if (!req.user.isAdmin && !req.user.isDeptHead) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.announcementId);
        if (!announcement) {
            return next(errorHandler(404, "Announcement not found"));
        }
        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export const getAnnouncementById = async (req, res, next) => {
    if (!req.user.isMember && !req.user.isAdmin && !req.user.isDeptHead) {
        return next(errorHandler(403, "You are not allowed to perform this task"));
    }

    try {
        const announcement = await Announcement.findById(req.params.announcementId);
        if (!announcement) {
            return next(errorHandler(404, "Announcement not found"));
        }
        res.status(200).json(announcement);
    } catch (error) {
        next(error);
    }
}
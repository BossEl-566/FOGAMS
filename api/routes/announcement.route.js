import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createAnnouncement, deleteAnnouncement, getAnnouncement, getAnnouncementById } from "../controllers/announcement.controller.js";





const router = express.Router();

router.post("/create", verifyToken, createAnnouncement);
router.get("/get", verifyToken, getAnnouncement);
router.delete("/delete/:announcementId", verifyToken, deleteAnnouncement);
router.get("/get/:announcementId", verifyToken, getAnnouncementById); // Assuming you have a function to get by ID





export default router;
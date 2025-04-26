import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createAnnouncement } from "../controllers/announcement.controller.js";





const router = express.Router();

router.post("/create", verifyToken, createAnnouncement);





export default router;
import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPosition } from "../controllers/poll.controller.js";




const router = express.Router();

router.post('/create', verifyToken, createPosition);



export default router;
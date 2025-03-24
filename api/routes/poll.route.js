import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { castVote, createPosition, getPollResults, getPositions } from "../controllers/poll.controller.js";




const router = express.Router();

router.post('/create', verifyToken, createPosition);
router.get("/get", verifyToken, getPositions);
router.post("/vote/:positionId", verifyToken, castVote);
router.get('/getPolls', verifyToken, getPollResults);



export default router;
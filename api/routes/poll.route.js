import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { castVote, createPosition, deletePosition, getPollResults, getPositions } from "../controllers/poll.controller.js";




const router = express.Router();

router.post('/create', verifyToken, createPosition);
router.get("/get", verifyToken, getPositions);
router.post("/vote/:positionId", verifyToken, castVote);
router.get('/getPolls', verifyToken, getPollResults);
router.delete('/delete/:positionId', verifyToken, deletePosition);



export default router;
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createNotepad } from '../controllers/notepad.controller.js';




const router = express.Router();

router.post('/create', verifyToken, createNotepad);





export default router;
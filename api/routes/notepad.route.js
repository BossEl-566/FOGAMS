import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createNotepad, deleteNotepad, getNotepad, patchNotepad, updateNotepad, viewNotepad } from '../controllers/notepad.controller.js';




const router = express.Router();

router.post('/create', verifyToken, createNotepad);
router.get('/get', verifyToken, getNotepad);
router.get('/get/:notepadId', verifyToken, viewNotepad);
router.delete('/delete/:notepadId', verifyToken, deleteNotepad);
router.patch('/patch/:notepadId', verifyToken, patchNotepad);
router.put('/update/:notepadId', verifyToken, updateNotepad);





export default router;
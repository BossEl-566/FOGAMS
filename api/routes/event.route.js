import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createEvent, deleteEvent } from '../controllers/event.controller.js';
import { getEvents } from '../controllers/event.controller.js';



const router = express.Router();

router.post('/create', verifyToken, createEvent);
router.get('/get', getEvents);
router.delete('/delete/:eventId', verifyToken, deleteEvent);


export default router;
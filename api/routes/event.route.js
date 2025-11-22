import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createEvent, deleteEvent, editEvent, getEvent } from '../controllers/event.controller.js';
import { getEvents } from '../controllers/event.controller.js';



const router = express.Router();

router.post('/create', verifyToken, createEvent);
router.get('/get', getEvents);
router.delete('/delete/:eventId', verifyToken, deleteEvent);
router.get('/get/:eventId', getEvent);
router.put('/update/:eventId', verifyToken, editEvent); // Assuming createEvent handles updates as well


export default router;
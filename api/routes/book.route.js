import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { bookAppointment, createBookTime, getBookTime } from '../controllers/book.controller.js';




const router = express.Router();

router.post('/create', verifyToken, createBookTime);
router.get('/get', verifyToken, getBookTime);
router.post('/book-appointment/:bookingId/:slotId', verifyToken, bookAppointment);








export default router;
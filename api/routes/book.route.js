import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { bookAppointment, createBookTime, deleteSlot, getBookTime, getNames } from '../controllers/book.controller.js';




const router = express.Router();

router.post('/create', verifyToken, createBookTime);
router.get('/get', verifyToken, getBookTime);
router.post('/book-appointment/:bookingId/:slotId', verifyToken, bookAppointment);
router.get('/get-names/:slotId', verifyToken, getNames);
router.delete('/delete/:bookingId/:slotId', verifyToken, deleteSlot);








export default router;
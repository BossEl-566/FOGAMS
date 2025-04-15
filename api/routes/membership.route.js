import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createMembership, deleteMembership, getMembership, sendBirthdaySMS, updateMembership, getTodayBirthdays } from '../controllers/membership.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createMembership);
router.get('/get', verifyToken, getMembership);
router.put('/update/:membershipId', verifyToken, updateMembership);
router.delete('/delete/:membershipId', verifyToken, deleteMembership);
router.get('/send-birthday-sms', verifyToken, sendBirthdaySMS); 
router.get('/birthdays-today', verifyToken, getTodayBirthdays);



export default router;
// Compare this snippet from FOGAMS/api/controllers/membership.controller.js:
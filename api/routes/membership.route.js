import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createMembership, getMembership, updateMembership } from '../controllers/membership.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createMembership);
router.get('/get', verifyToken, getMembership);
router.put('/update/:membershipId', verifyToken, updateMembership);


export default router;
// Compare this snippet from FOGAMS/api/controllers/membership.controller.js:
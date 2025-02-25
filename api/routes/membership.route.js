import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createMembership, getMembership } from '../controllers/membership.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createMembership);
router.get('/get', verifyToken, getMembership);


export default router;
// Compare this snippet from FOGAMS/api/controllers/membership.controller.js:
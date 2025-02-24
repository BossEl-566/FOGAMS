import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createMembership } from '../controllers/membership.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createMembership);

export default router;
// Compare this snippet from FOGAMS/api/controllers/membership.controller.js:
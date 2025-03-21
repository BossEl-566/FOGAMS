import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { baptizeApplicant, createBaptism, getApplicants } from '../controllers/baptism.controller.js';




const router = express.Router();

router.post('/create', verifyToken, createBaptism);
router.get('/applicants', verifyToken, getApplicants);
router.put('/baptize/:applicantId', verifyToken, baptizeApplicant);





export default router;
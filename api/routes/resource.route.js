import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createResource } from '../controllers/resource.controller.js';


const router = express.Router();

router.post('/create', verifyToken, createResource);


export default router;
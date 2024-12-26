import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createResource, deleteResource, getResources } from '../controllers/resource.controller.js';
import { get } from 'mongoose';


const router = express.Router();

router.post('/create', verifyToken, createResource);
router.get('/get', verifyToken, getResources);
router.delete('/delete/:id', verifyToken, deleteResource);


export default router;
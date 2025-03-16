import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createTithe } from '../controllers/tithe.controller.js';



const router = express.Router()

router.post('/create', verifyToken, createTithe)
export default router;
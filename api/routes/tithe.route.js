import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createTithe, getTithe, getTitheId } from '../controllers/tithe.controller.js';



const router = express.Router()

router.post('/create', verifyToken, createTithe)
router.get('/getTithe', verifyToken, getTithe)
router.get('/getTithe/:titheId', verifyToken, getTitheId)



export default router;

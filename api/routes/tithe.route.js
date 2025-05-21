import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { approveEditTithe, createTithe, editTithe, getTithe, getTitheId, requestEditTithe } from '../controllers/tithe.controller.js';




const router = express.Router()

router.post('/create', verifyToken, createTithe)
router.get('/getTithe', verifyToken, getTithe)
router.get('/getTithe/:titheId', verifyToken, getTitheId)
router.put('/editTithe/:titheId', verifyToken, editTithe)
router.put('/requestEdit/:titheId', verifyToken, requestEditTithe)
router.put('/approveTithe/:titheId', verifyToken, approveEditTithe)



export default router;

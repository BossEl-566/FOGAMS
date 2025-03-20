import express from 'express'
import { verifyToken } from "../utils/verifyUser.js";
import { approveTithe, createChurchAccount, createTithe, deleteTithe, getAllTithe, getChurchRecord, getClickedChurchRecord, getMembers, getTithe, getTitheForUpdate, updateChurchRecord, updateTithe, updateTitheRecord } from '../controllers/churchAccount.controller.js';


const router = express.Router()

router.post('/create', verifyToken, createChurchAccount)
router.get('/get-members', verifyToken, getMembers)
router.get('/tithe', verifyToken, getTithe)
router.put('/approve-tithe/:titheId', verifyToken, approveTithe)
router.delete('/delete-tithe/:titheId', verifyToken, deleteTithe)
router.get('/get-tithe/:titheId', verifyToken, getTitheForUpdate)
router.put('/update-tithe/:titheId', verifyToken, updateTithe)
router.post('/create-tithe', verifyToken, createTithe)
router.get('/get-church-record', verifyToken, getChurchRecord)
router.get('/get-church-record/:churchAccountId', verifyToken, getClickedChurchRecord)
router.put('/update-church-record/:churchAccountId', verifyToken, updateChurchRecord)
router.get('/get-alltithe', verifyToken, getAllTithe)
router.put('/tithe/:titheId', verifyToken, updateTitheRecord)

export default router;
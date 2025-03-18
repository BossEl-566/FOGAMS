import express from 'express'
import { verifyToken } from "../utils/verifyUser.js";
import { createChurchAccount } from '../controllers/churchAccount.controller.js';


const router = express.Router()

router.post('/create', verifyToken, createChurchAccount)



export default router;
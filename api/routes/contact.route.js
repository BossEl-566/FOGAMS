import express from 'express';
import { createContact, deleteContactMessage, getContactMessages } from '../controllers/contact.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router()

router.post('/create', createContact)
router.get('/get', verifyToken, getContactMessages)
router.delete('/delete/:messageId', verifyToken, deleteContactMessage)



export default router
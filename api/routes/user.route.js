import express from 'express';
import { deleteUser, getAllUsers, getUser, getUsers, signout, test, updateMemberUser, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { get } from 'mongoose';

const router = express.Router();
router.get('/get-all', verifyToken, getAllUsers);
router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.put('/updatemember/:userId', verifyToken, updateMemberUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);


export default router;
import express from 'express'
import { createComment, getPostComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { get } from 'mongoose';

const router = express.Router()

router.post('/create', verifyToken, createComment)
router.get('/getPostComment/:postId', getPostComment)

export default router;
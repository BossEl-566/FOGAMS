import express from 'express'
import { createComment, deleteComment, editComment, getcomments, getPostComment, likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { get } from 'mongoose';

const router = express.Router()

router.post('/create', verifyToken, createComment)
router.get('/getPostComment/:postId', getPostComment)
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editComment/:commentId', verifyToken, editComment)
router.delete('/deleteComment/:commentId', verifyToken, deleteComment)
router.get('/getcomments', verifyToken, getcomments)

export default router;
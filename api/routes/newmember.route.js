// routes/newmember.routes.js
import express from 'express';
import {
    addNewMember,
    getNewMembers,
    getNewMemberById,
    updateNewMember,
    deleteNewMember,
    getNewMemberStats,
    exportNewMembers
} from '../controllers/newmember.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Add new member
router.post('/add', verifyToken, addNewMember);

// Get all members with optional filtering
router.get('/all', verifyToken, getNewMembers);

// Get member by ID
router.get('/:id', verifyToken, getNewMemberById);

// Update member
router.put('/:id', verifyToken, updateNewMember);

// Delete member
router.delete('/:id', verifyToken, deleteNewMember);

// Get statistics
router.get('/stats/all', verifyToken, getNewMemberStats);

// Export members data
router.get('/export/all', verifyToken, exportNewMembers);

export default router;
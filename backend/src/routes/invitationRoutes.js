import express from 'express';
const router = express.Router();
import { createInvitation, deleteInvitation, getInvitation, getInvitations } from '../controllers/invitationController.js';

// Create a new invitation
router.post('/', createInvitation);

// Get all invitations
router.get('/', getInvitations);

// Get a specific invitation by ID
router.get('/:id', getInvitation);

// Delete an invitation by ID
router.delete('/:id', deleteInvitation);

export default router;
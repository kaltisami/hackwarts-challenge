import express from 'express';
import { createProgression, getProgressionsByChild, getProgressionsByGroup, generateProgressionReport } from '../controllers/progressionController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create a new progression (protected route)
router.post('/', authenticateAdmin, createProgression);

// Get progressions for a specific child
router.get('/child/:childId', authenticateAdmin, getProgressionsByChild);

// Get progressions for a specific group
router.get('/group/:groupId', authenticateAdmin, getProgressionsByGroup);

// Generate progression report for a program
router.get('/report/:programId', authenticateAdmin, generateProgressionReport);

export default router;

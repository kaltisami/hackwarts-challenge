import express from 'express';
import { login, createAdmin, changePassword } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin login route
router.post('/login', login);

// Create new admin account (protected route)
router.post('/create', authenticateAdmin, createAdmin);

// Change admin password (protected route)
router.put('/change-password/:id', authenticateAdmin, changePassword);

export default router;

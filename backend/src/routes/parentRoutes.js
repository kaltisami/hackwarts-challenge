import express from 'express';
const router = express.Router();
import { createParent, deleteParent, getParent, getParents, updateParent } from '../controllers/parentController.js';
import { getChildren } from '../controllers/childrenController.js';

// Create a new parent
router.post('/', createParent);

// Get all parents
router.get('/', getParents);

// Get a specific parent by ID
router.get('/:id', getParent);

// Update a parent by ID
router.put('/:id', updateParent);

// Get children of a parent by ID
router.get('/:id/children', getChildren);

// Delete a parent by ID
router.delete('/:id', deleteParent);

export default router;
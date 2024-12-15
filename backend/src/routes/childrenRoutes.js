import express from 'express';
const router = express.Router();
import { createChild, deleteChild, getChild, getChildModels, getChildren, updateChild } from '../controllers/childrenController.js';

// Create a new child
router.post('/', createChild);

// Get all children
router.get('/', getChildren);

// Get a specific child by ID
router.get('/:id', getChild);

// Update a child by ID
router.put('/:id', updateChild);

// Delete a child by ID
router.delete('/:id', deleteChild);

// Get all models for a child
router.get('/:id/models', getChildModels);

export default router;
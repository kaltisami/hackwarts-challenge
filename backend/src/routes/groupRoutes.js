import express from 'express';
import { createGroup, deleteGroup, getGroup, getGroupChildren, getGroups, updateGroup } from '../controllers/groupController.js';
const router = express.Router();

// Create a new group
router.post('/',createGroup)

// Get all groups
router.get('/', getGroups)

// Get a specific group by ID
router.get('/:id', getGroup)

// Update a specific group by ID
router.put('/:id', updateGroup)

// Delete a specific group by ID
router.delete('/:id', deleteGroup)

// Get the list of children by group ID
router.get('/:id/children', getGroupChildren)

export default router;
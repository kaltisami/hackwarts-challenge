import express from 'express';
const router = express.Router();
import {createProgram, deleteProgram, getProgram, getProgramProgress, getPrograms, updateProgram} from '../controllers/programController.js';

// Create a new program
router.post('/', createProgram);

// Get all programs
router.get('/', getPrograms);

// Get a specific program by ID
router.get('/:id', getProgram);

// Update a program by ID
router.put('/:id', updateProgram);

// Delete a program by ID
router.delete('/:id', deleteProgram);

// Get progress for a specific program
router.get('/:id/progress', getProgramProgress);

export default router;
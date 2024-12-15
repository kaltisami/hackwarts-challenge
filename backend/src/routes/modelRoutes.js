import express from 'express';
const router = express.Router();
import { createModel, deleteModel, getModels, getModelsByChild, getRemainingModels, updateModel } from '../controllers/modelController.js';

// Create a new model
router.post('/', createModel);

// Get all models
router.get('/', getModels);

// Get models by child
router.get('/:childId', getModelsByChild);

// Update a model
router.put('/:id', updateModel);

// Delete a model
router.delete('/:id', deleteModel);

// Get remaining models
router.get('/remaining/:childId', getRemainingModels);

export default router;
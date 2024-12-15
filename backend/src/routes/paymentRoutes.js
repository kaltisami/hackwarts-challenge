import express from 'express';
const router = express.Router();
import { createPayment, generateFinancialReport, getPayments, getPaymentsByChild } from '../controllers/paymentController.js';

// Create a new payment
router.post('/', createPayment);

// Get all payments
router.get('/', getPayments);

// Get payments by child
router.get('/:childId', getPaymentsByChild);

// Generate financial report
router.get('/report', generateFinancialReport);

export default router;
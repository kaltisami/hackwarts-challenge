import express from 'express';
const router = express.Router();
import { getAttendanceByChild, getAttendanceByGroup, markAttendance, updateAttendance,  } from '../controllers/attendanceController.js';

// Create a new attendance record
router.post('/', markAttendance);

// Get attendance records for a child
router.get('/:childId', getAttendanceByChild);

// Get attendance records for a group
router.get('/', getAttendanceByGroup);

// Update an attendance record
router.put('/:id', updateAttendance);

export default router;
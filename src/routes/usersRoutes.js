import express from 'express';
import { registerStudent, loginStudent, registerTeacher, loginTeacher } from '../controllers/authControllers.js';

const router = express.Router();

// Route to register a student
router.post('/registerStudent', registerStudent);
// Route to login a student
router.post('/loginStudent', loginStudent);
// Route to register a teacher
router.post('/registerTeacher', registerTeacher);
// Route to login a teacher
router.post('/loginTeacher', loginTeacher);

export default router;
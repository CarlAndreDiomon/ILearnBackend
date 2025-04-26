import express from 'express';
import { registerStudent, loginStudent, loginTeacher, logout} from '../controllers/authControllers.js';

const router = express.Router();

// Route to register a student
router.post('/registerStudent', registerStudent);
// Route to login a student
router.post('/loginStudent', loginStudent);
// Route to login a teacher
router.post('/loginTeacher', loginTeacher);
// Route to logout
router.post('/logout', logout);

export default router;
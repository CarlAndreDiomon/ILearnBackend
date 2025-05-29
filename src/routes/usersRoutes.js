import express from 'express';
import { registerStudent, loginStudent, loginTeacher, logout, changeProfile, logoutTeacher} from '../controllers/userControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to register a student
router.post('/registerStudent', registerStudent);
// Route to login a student
router.post('/loginStudent', loginStudent);
// Route to login a teacher
router.post('/loginTeacher', loginTeacher);
// Route to logout
router.post('/logout',protect, logout);
//
router.post('/logoutTeacher', protect, logoutTeacher);
// Change Profile
router.post('/changeProfile', protect, changeProfile);

export default router;
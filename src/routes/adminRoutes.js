import express from 'express';
import { getAdmin, getStudentLogs, getTeacherLogs, loginAdmin, registerAdmin, registerTeacher, checkAdminAuth, logout } from '../controllers/adminController.js';
import { isAdmin } from '../middleware/roleCheckMiddleware.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();


// Route to register an admin
router.post('/register', registerAdmin);
// Route to login an admin
router.post('/login', loginAdmin);
// Route to get all admins
router.get('/', isAdmin, getAdmin);
//  Checkauth
router.get('/checkAdminAuth', protect, checkAdminAuth);
//  logout
router.post('/logout', logout);

// Route to register a teacher
router.post('/registerTeacher', protect, isAdmin, registerTeacher);
// Route to get student logs
router.get('/studentLogs', protect, isAdmin, getStudentLogs);
// Route to get teacher logs
router.get('/teacherLogs', protect, isAdmin, getTeacherLogs);

export default router;
import express from 'express';
import { downloadFiles, getFiles, uploadFiles } from '../controllers/moduleController.js';
import { isStudent, isTeacher } from '../middleware/roleCheckMiddleware.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get modules grouped by grade
router.post('/upload',protect, isTeacher, uploadFiles);

// Route to get modules grouped by grade
router.get('/files', protect, getFiles);

// Download file
router.get('/download/:name', protect, isStudent, downloadFiles);
// Add other routes as needed

export default router;
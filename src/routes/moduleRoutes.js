import express from 'express';
import { downloadFiles, getFiles, uploadFiles } from '../controllers/moduleController.js';
import { isStudent, isTeacher } from '../middleware/roleCheckMiddleware.js';

const router = express.Router();

// Route to get modules grouped by grade
router.post('/upload', isTeacher, uploadFiles);

// Route to get modules grouped by grade
router.get('/files', getFiles);

// Download file
router.get('/download/:name', isStudent, downloadFiles);
// Add other routes as needed

export default router;
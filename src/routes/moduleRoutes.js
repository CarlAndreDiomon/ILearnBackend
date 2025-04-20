import express from 'express';
import { downloadFiles, getFiles, uploadFiles } from '../controllers/moduleController.js';

const router = express.Router();

// Route to get modules grouped by grade
router.post('/upload', uploadFiles);

// Route to get modules grouped by grade
router.get('/files', getFiles);

// Download file
router.get('/download/:name', downloadFiles);
// Add other routes as needed

export default router;
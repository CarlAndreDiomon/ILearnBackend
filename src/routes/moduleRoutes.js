import express from 'express';
import { getModulesGroupedByGrade } from '../controllers/moduleController';

const router = express.Router();

// Route to get modules grouped by grade
router.get('/modules/grouped', getModulesGroupedByGrade);

// Add other routes as needed

export default router;
import express from 'express';
import { getAdmin, loginAdmin, registerAdmin } from '../controllers/adminController.js';

const router = express.Router();


// Route to register an admin
router.post('/register', registerAdmin);
// Route to login an admin
router.post('/login', loginAdmin);
// Route to get all admins
router.get('/', getAdmin);

export default router;
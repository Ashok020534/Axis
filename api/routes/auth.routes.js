import express from 'express';
import { registerUser, loginUser, getUserDetails } from '../controller/auth.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/details/:mobile',authMiddleware, getUserDetails);

export default router;

import express from 'express';
import { storeSms } from '../controller/storeSms.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';


const router = express.Router();

router.post('/storeSms', authMiddleware, storeSms)

export default router
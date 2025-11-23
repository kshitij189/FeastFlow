// routes/adminRoutes.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddlware from '../middleware/adminMidlleware.js';
import { changeUserRoleController } from '../controllers/adminController.js';

const router = express.Router();

// Admin-only: change a user's role
router.patch('/users/:id/role', authMiddleware, adminMiddlware, changeUserRoleController);

export default router;
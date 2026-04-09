import express from 'express';
import { googleAuth, getMe } from '../controller/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const authRouter=express.Router();

authRouter.post('/google',googleAuth);
authRouter.get('/me', protectedRoute, getMe);

export default authRouter;
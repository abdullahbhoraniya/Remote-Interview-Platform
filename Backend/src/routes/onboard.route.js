import express, { Router } from 'express';
import { setRole } from '../controller/onboard.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { completeProfile } from '../controller/onboard.controller.js';
import { upload } from '../lib/upload.js';

const roleRouter=express.Router();

roleRouter.post('/set-role',protectedRoute,setRole);
roleRouter.post('/complete-profile',protectedRoute,upload.single('resume'),completeProfile);
export default roleRouter;


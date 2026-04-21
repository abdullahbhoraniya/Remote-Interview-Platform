import express from 'express'
import { createJob, createRecruiter } from '../controller/recruiter.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const recruiterRouter=express.Router();

// Verifying and creating the new recruiter
recruiterRouter.post('/create-recruiter',protectedRoute,createRecruiter);

// Job Routes
recruiterRouter.post('/create-job',protectedRoute,createJob);

//create job

export default recruiterRouter;
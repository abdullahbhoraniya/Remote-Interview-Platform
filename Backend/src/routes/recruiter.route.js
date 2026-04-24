import express from 'express'
import { createJob, createRecruiter, getMyJobById, getMyJobs, updateJob } from '../controller/recruiter.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const recruiterRouter=express.Router();

// Verifying and creating the new recruiter
recruiterRouter.post('/create-recruiter',protectedRoute,createRecruiter);

// Job Routes
recruiterRouter.post('/create-job',protectedRoute,createJob);
recruiterRouter.get('/get-my-job',protectedRoute,getMyJobs);
recruiterRouter.get('/get-job-by-id/:id',protectedRoute,getMyJobById);
recruiterRouter.put('/update-jobs/:id',protectedRoute,updateJob);

//create job

export default recruiterRouter;
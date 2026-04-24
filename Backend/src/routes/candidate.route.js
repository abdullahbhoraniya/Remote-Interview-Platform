import express from 'express';
import { getJobById, getJobs } from '../controller/candidate.controller.js';


const candidateRoute=express.Router();

candidateRoute.get('/getJobs',getJobs);
candidateRoute.get('/getJobById/:id',getJobById);



export default candidateRoute;
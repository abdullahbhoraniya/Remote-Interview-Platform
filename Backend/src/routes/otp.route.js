import express from 'express'
import { sendOtp, verifyOtp } from '../controller/otp.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const otpRoute=express.Router();

otpRoute.post('/send-otp',protectedRoute,sendOtp);
otpRoute.post('/verify-otp',protectedRoute,verifyOtp);



export default otpRoute;

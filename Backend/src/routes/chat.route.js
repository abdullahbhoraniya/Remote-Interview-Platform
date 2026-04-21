import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getStreamToken } from '../controller/chat.controller.js';

const chatrouter=express.Router();


chatrouter.get('/token',protectedRoute,getStreamToken)


export default chatrouter;
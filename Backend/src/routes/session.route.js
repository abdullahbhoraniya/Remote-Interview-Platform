import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import {
  createSession,
  getActiveSession,
  getMyRecentSession,
  getSessionById,
  joinSession,
  leaveSession
} from '../controller/session.controller.js';

const sessionRouter = express.Router();

// ✅ Static routes FIRST
sessionRouter.get("/my-recent", protectedRoute, getMyRecentSession);
sessionRouter.get("/active", protectedRoute, getActiveSession);

// ✅ Dynamic routes AFTER
sessionRouter.get("/:id", protectedRoute, getSessionById);

// POST routes
sessionRouter.post("/", protectedRoute, createSession);
sessionRouter.post("/:id/join", protectedRoute, joinSession);
sessionRouter.post("/:id/leave", protectedRoute, leaveSession);

export default sessionRouter;
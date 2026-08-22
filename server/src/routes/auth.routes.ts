import { Router } from "express";

import {
  signup,
  login,
  getCurrentUser,
  isAuthenticated,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/current-user", authMiddleware, getCurrentUser);

router.get("/is-authenticated", authMiddleware, isAuthenticated);

export default router;

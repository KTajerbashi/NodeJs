import { Router } from "express";

import {
  signup,
  login,
  getCurrentUser,
  getAccessToken,
  isAuthenticated,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/access-token", getAccessToken);

router.get("/current-user", authMiddleware, getCurrentUser);

router.get("/is-authenticated", authMiddleware, isAuthenticated);

export default router;

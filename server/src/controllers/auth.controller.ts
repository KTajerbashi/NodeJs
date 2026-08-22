import type { Request, Response } from "express";

import { AuthRepository } from "../repositories/auth.repository.js";
import { AuthService } from "../services/auth.service.js";

import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

const authService = new AuthService(new AuthRepository());

export async function signup(req: Request, res: Response): Promise<void> {
  const user = await authService.signup(req.body);

  res.status(201).json(user);
}

export async function login(req: Request, res: Response): Promise<void> {
  const result = await authService.login(req.body);

  res.status(200).json(result);
}

export async function getCurrentUser(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  const userKey = req.user?.userKey;

  if (!userKey) {
    res.status(401).json({
      message: "Authentication required.",
    });

    return;
  }

  const user = await authService.getCurrentUser(userKey);

  if (!user) {
    res.status(404).json({
      message: "User not found.",
    });

    return;
  }

  res.status(200).json(user);
}

export async function isAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  const userKey = req.user?.userKey;
  const authenticated = await authService.isAuthenticated(userKey);
  res.status(200).json(authenticated);
}

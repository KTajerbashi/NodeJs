import type { Request, Response } from "express";

import { UserRepository } from "../repositories/userRepository.js";
import { UserService } from "../services/userService.js";

const userService = new UserService(new UserRepository());

export async function getUsers(_req: Request, res: Response): Promise<void> {
  const users = await userService.onGetAsync();
  res.status(200).json(users);
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;
  const user = await userService.onGetByIdAsync(id);

  if (!user) {
    res.status(404).json({
      message: "User not found.",
    });

    return;
  }

  res.status(200).json(user);
}

export async function createUser(req: Request, res: Response): Promise<void> {
  console.log("[user_api] ",req.body)
  const user = await userService.onCreateAsync(req.body);

  res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;
  const user = await userService.onUpdateByKeyAsync(id, req.body);

  if (!user) {
    res.status(404).json({
      message: "User not found.",
    });

    return;
  }

  res.status(200).json(user);
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;
  const user = await userService.onDeleteByKeyAsync(id);

  if (!user) {
    res.status(404).json({
      message: "User not found.",
    });

    return;
  }

  res.status(204).send();
}

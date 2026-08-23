import type { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.error("[Error]", error);

  if (error instanceof Error) {
    res.status(400).json({
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    message: "Internal server error.",
  });
}

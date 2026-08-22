import jwt, { type SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return secret;
}

const JWT_EXPIRES_IN: SignOptions["expiresIn"] = (process.env.JWT_EXPIRES_IN ??
  "1h") as StringValue;

export interface IJwtPayload {
  userKey: string;
}

export function generateAccessToken(userKey: string): string {
  return jwt.sign({ userKey }, getJwtSecret(), {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyAccessToken(token: string): IJwtPayload {
  return jwt.verify(token, getJwtSecret()) as IJwtPayload;
}

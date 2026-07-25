import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.auth_token;

  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "super-secret-key",
    ) as { userId: string; email: string };

    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

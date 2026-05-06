import { Response, NextFunction } from "express";
import { AuthRequest } from "./require-auth";

export function requireTeacher(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  if (req.user?.role !== "teacher") {
    res.status(403).json({ error: "Accès réservé aux enseignants." });
    return;
  }
  next();
}

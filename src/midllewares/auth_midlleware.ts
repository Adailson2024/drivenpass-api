import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Token missing");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "secret");
    res.locals.user = data;
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
}
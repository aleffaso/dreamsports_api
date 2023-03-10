import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import "dotenv/config";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  const token = authorization.replace("Bearer", "").trim();

  try {
    const { id } = jwt.verify(token, process.env.JWT as string) as TokenPayload;

    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

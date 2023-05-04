import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "./types";

import "dotenv/config";
import { KEYS } from "../constants";

export default function userAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  const token = authorization.replace("Bearer", "").trim();

  try {
    const { id } = jwt.verify(token, KEYS.JWT.USER) as TokenPayload;

    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

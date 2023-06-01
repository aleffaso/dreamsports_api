import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { TokenPayload } from "./types";

import { UserJWTToken as UserJWTTokenTable } from "../entities/UserJWTToken";
import { KEYS } from "../constants";
import { DoesNotExistError, ForbiddenError } from "../errors";
import { AppDataSource } from "../data-source";

export default async function userAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new DoesNotExistError("Invalid token");
    }

    const currentToken = authorization.replace("Bearer", "").trim();
    const { id } = jwt.verify(
      currentToken,
      KEYS.JWT.USER_TOKEN_KEY
    ) as TokenPayload;

    const tokenRepo = AppDataSource.getRepository(UserJWTTokenTable);
    const token = await tokenRepo.findOne({
      where: { token: currentToken, active: true },
    });

    if (!token) {
      throw new ForbiddenError("Invalid token");
    }

    req.userId = id;

    return next();
  } catch (error) {
    if (
      error instanceof DoesNotExistError ||
      error instanceof TokenExpiredError ||
      error instanceof ForbiddenError
    ) {
      return {
        status_code: res.status(401).json({ message: "Invalid token" }),
      };
    }
  }
}

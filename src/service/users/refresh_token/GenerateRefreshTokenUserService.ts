import jwt, { TokenExpiredError } from "jsonwebtoken";

import { AppDataSource } from "../../../data-source";
import { UserJWTToken as UserJWTTokenTable } from "../../../entities/UserJWTToken";
import { TokenPayload, UserJWTTokenRequest } from "../types";
import { DoesNotExistError } from "../../../errors";
import { KEYS } from "../../../constants";

class GenerateRefreshTokenUserService {
  async execute({ refresh_token }: UserJWTTokenRequest) {
    try {
      jwt.verify(
        refresh_token as string,
        KEYS.JWT.USER_REFRESH_TOKEN_KEY
      ) as TokenPayload;

      const refreshTokenRepo = AppDataSource.getRepository(UserJWTTokenTable);
      const refreshToken = await refreshTokenRepo.findOne({
        where: { refresh_token },
      });

      if (!refreshToken) {
        throw new DoesNotExistError("Invalid refresh_token");
      }

      const new_token = jwt.sign(
        { id: refreshToken.user.id },
        KEYS.JWT.USER_TOKEN_KEY,
        {
          expiresIn: KEYS.JWT.TOKEN_EXPIRES_IN,
        }
      );

      const new_refresh_token = jwt.sign(
        { id: refreshToken.user.id },
        KEYS.JWT.USER_REFRESH_TOKEN_KEY,
        {
          expiresIn: KEYS.JWT.REFRESH_TOKEN_EXPIRES_IN,
        }
      );

      return { token: new_token, refresh_token: new_refresh_token };
    } catch (error) {
      if (
        error instanceof DoesNotExistError ||
        error instanceof TokenExpiredError
      ) {
        return {
          status_code: {
            status: 401,
            message: "Invalid refresh token",
          },
        };
      }
    }
  }
}

export { GenerateRefreshTokenUserService };

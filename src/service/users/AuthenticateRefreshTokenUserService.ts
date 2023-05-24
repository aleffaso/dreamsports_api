import jwt from "jsonwebtoken";

import { AppDataSource } from "../../data-source";
import { RefreshToken as RefreshTokenTable } from "../../entities/RefreshToken";
import { User as UserTable } from "../../entities/User";
import { UserRefreshTokenRequest } from "./types";
import { DoesNotExistError } from "../../errors";
import { KEYS } from "../../constants";
import dayjs from "dayjs";

class AuthenticateRefreshTokenUserService {
  async execute({ refresh_token }: UserRefreshTokenRequest) {
    try {
      const refreshTokenRepo = AppDataSource.getRepository(RefreshTokenTable);
      const refreshToken = await refreshTokenRepo.findOne({
        where: { id: refresh_token },
      });

      const userRepo = AppDataSource.getRepository(UserTable);
      const user = await userRepo.findOne({
        where: {
          refresh_token: {
            id: refreshToken?.id,
          },
        },
      });

      if (!refreshToken || !user) {
        throw new DoesNotExistError("Invalid refresh token");
      }

      const expiresIn = dayjs().add(KEYS.JWT.EXPIRATION_TIME, "day").unix();

      const token = jwt.sign({ id: user?.id }, KEYS.JWT.USER, {
        expiresIn: expiresIn,
      });

      return { refresh_token: token };
    } catch (error) {
      if (error instanceof DoesNotExistError) {
        return {
          message: error.name,
          status_code: error.status(),
        };
      }
    }
  }
}

export { AuthenticateRefreshTokenUserService };

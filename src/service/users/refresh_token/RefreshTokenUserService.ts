import jwt from "jsonwebtoken";

import { AppDataSource } from "../../../data-source";
import { UserJWTToken as UserJWTTokenTable } from "../../../entities/UserJWTToken";
import { User as UserTable } from "../../../entities/User";
import { UserJWTTokenCreate, UserJWTTokenResponse } from "../types";
import { DoesNotExistError } from "../../../errors";
import { KEYS } from "../../../constants";

export class RefreshTokenUserService {
  async execute({ userId }: UserJWTTokenCreate) {
    try {
      const userRepo = AppDataSource.getRepository(UserTable);

      const user = await userRepo.findOne({ where: { id: userId } });

      if (!user) {
        throw new DoesNotExistError("User does not exist");
      }

      const tokenRepo = AppDataSource.getRepository(UserJWTTokenTable);

      const token = jwt.sign({ id: user?.id }, KEYS.JWT.USER_TOKEN_KEY, {
        expiresIn: KEYS.JWT.TOKEN_EXPIRES_IN,
      });

      const refresh_token = jwt.sign(
        { id: user?.id },
        KEYS.JWT.USER_REFRESH_TOKEN_KEY,
        {
          expiresIn: KEYS.JWT.REFRESH_TOKEN_EXPIRES_IN,
        }
      );

      const result_tokens = tokenRepo.create({
        token,
        refresh_token,
        user,
      });

      await tokenRepo.save(result_tokens);

      return { token, refresh_token } as UserJWTTokenResponse;
    } catch (error) {
      if (error) {
        return {
          error,
        };
      }
    }
  }
}

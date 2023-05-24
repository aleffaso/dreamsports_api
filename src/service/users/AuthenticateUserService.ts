import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { UserRequest, UserResponse } from "./types";
import { KEYS } from "../../constants";
import { DoesNotExistError } from "../../errors";
import { RefreshTokenUserService } from "./RefreshTokenUserService";
import dayjs from "dayjs";

class AuthenticateUserService {
  async execute({ email, password }: UserRequest) {
    try {
      const userRepo = AppDataSource.getRepository(UserTable);
      const user = await userRepo.findOne({ where: { email } });

      if (!user) {
        throw new DoesNotExistError("Data does not match");
      }

      const isValidPassword = await bcrypt.compare(
        password as string,
        user.password
      );

      if (!isValidPassword) {
        throw new DoesNotExistError("Data does not match");
      }

      const userResponse: UserResponse = {
        id: user.id,
        name: user.name,
        admin: user.admin,
        is_active: user.is_active,
        email: email,
      };

      const expiresIn = dayjs().add(KEYS.JWT.EXPIRATION_TIME, "day").unix();

      const token = jwt.sign({ id: user.id }, KEYS.JWT.USER, {
        expiresIn: expiresIn,
      });

      const refreshTokenUserService = new RefreshTokenUserService();
      const refreshToken = await refreshTokenUserService.execute({
        userId: user.id,
      });

      return { user: userResponse, token, refresh_token_id: refreshToken };
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

export { AuthenticateUserService };

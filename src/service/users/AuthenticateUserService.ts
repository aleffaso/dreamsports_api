import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { UserRequest, UserResponse } from "./types";
import { KEYS } from "../../constants";
import { DoesNotExistError } from "../../errors";
import { CreateJWTUserService } from "./CreateJWTUserService";
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

      const token = jwt.sign({ id: user.id }, KEYS.JWT.USER_TOKEN_KEY, {
        expiresIn: KEYS.JWT.TOKEN_EXPIRES_IN,
      });

      const refresh_token = jwt.sign(
        { id: user.id },
        KEYS.JWT.USER_REFRESH_TOKEN_KEY,
        {
          expiresIn: KEYS.JWT.REFRESH_TOKEN_EXPIRES_IN,
        }
      );

      const createJWTUserService = new CreateJWTUserService();
      await createJWTUserService.execute({ token, refresh_token, user });

      return { user: userResponse, token, refresh_token };
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

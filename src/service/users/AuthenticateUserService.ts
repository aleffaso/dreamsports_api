import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { UserRequest, UserResponse } from "./types";
import { KEYS } from "../../constants";
import { DoesNotExistError } from "../../errors";

class AuthenticateUserService {
  async execute({ email, password }: UserRequest) {
    try {
      const userRepo = AppDataSource.getRepository(UserTable);
      const user = await userRepo.findOne({ where: { email } });

      if (!user) {
        throw new DoesNotExistError("E-mail does not exist");
      }

      const isValidPassword = await bcrypt.compare(
        password as string,
        user.password
      );

      if (!isValidPassword) {
        throw new DoesNotExistError("Password does not match");
      }

      const token = jwt.sign({ id: user.id }, KEYS.JWT.USER, {
        expiresIn: "1d",
      });

      const userResponse: UserResponse = {
        id: user.id,
        name: user.name,
        admin: user.admin,
        is_active: user.is_active,
        email: email,
      };

      return { user: userResponse, token };
    } catch (error) {
      if (error instanceof DoesNotExistError) {
        return {
          message: error.name,
          statusCode: error.status(),
        };
      }
    }
  }
}

export { AuthenticateUserService };

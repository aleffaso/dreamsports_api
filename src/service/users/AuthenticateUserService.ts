import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { UserRequest, UserResponse } from "./types";

class AuthenticateUserService {
  async execute({ email, password }: UserRequest) {
    const userRepo = AppDataSource.getRepository(UserTable);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      throw {
        status: 401,
        message: "E-mail incorrect",
      };
    }

    const isValidPassword = await bcrypt.compare(
      password as string,
      user.password
    );

    if (!isValidPassword) {
      throw {
        status: 401,
        message: "Password incorrect",
      };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT as string, {
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
  }
}

export { AuthenticateUserService };

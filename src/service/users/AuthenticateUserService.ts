import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

interface IUserRequest {
  email: string;
  password: string;
}

const secret = process.env.JWT as string;

class AuthenticateUserService {
  async execute({ email, password }: IUserRequest) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      throw {
        status: 401,
        message: "E-mail incorrect",
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw {
        status: 401,
        message: "Password incorrect",
      };
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1d" });

    //TODO: exclude use.password from request

    return { user, token };
  }
}

export { AuthenticateUserService };

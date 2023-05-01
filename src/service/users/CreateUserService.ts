import bcrypt from "bcryptjs";

import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { UserCreate, UserResponse } from "./types";

export class CreateUserService {
  async execute({
    name,
    email,
    admin = false,
    is_active = true,
    password,
  }: UserCreate) {
    const userRepo = AppDataSource.getRepository(UserTable);
    const userAlreadyExists = await userRepo.findOne({ where: { email } });

    if (userAlreadyExists) {
      throw {
        status: 409,
        message: "User already exists",
      };
    }

    const user = userRepo.create({
      name,
      email,
      admin,
      is_active,
      password: bcrypt.hashSync(password as string, 8),
    });

    await userRepo.save(user);

    const userResponse: UserResponse = {
      id: user.id,
      name: name,
      admin: admin,
      is_active: is_active,
      email: email,
    };

    return { user: userResponse };
  }
}

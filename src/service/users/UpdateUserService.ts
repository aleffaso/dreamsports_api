import bcrypt from "bcryptjs";

import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { UserUpdate, UserResponse } from "./types";
import { DoesNotExistError } from "../../errors";

export class UpdateUserService {
  async execute({
    id,
    name,
    email,
    admin = false,
    is_active,
    password,
  }: UserUpdate) {
    const userRepo = AppDataSource.getRepository(UserTable);
    const user = await userRepo.findOne({ where: { id } });

    if (!user) {
      throw new DoesNotExistError("User does not exist");
    }

    userRepo.update(id as string, {
      name: name,
      email: email,
      admin: admin,
      is_active: is_active,
      password: bcrypt.hashSync(password as string, 8),
    });

    await userRepo.save(user);

    const userResponse: UserResponse = {
      id: id,
      name: name,
      admin: admin,
      is_active: is_active,
      email: email,
    };

    return { user: userResponse };
  }
}

import { AppDataSource } from "../../data-source";

import { User as UserTable } from "../../entities/User";
import { UserId, UserResponse } from "./types";

export class GetUserService {
  async execute({ id }: UserId) {
    const userRepo = AppDataSource.getRepository(UserTable);

    const user = await userRepo.findOne({ where: { id } });

    if (!user) {
      throw {
        status: 401,
        message: "User does not exist",
      };
    }

    const userResponse: UserResponse = {
      id: id,
      name: user.name,
      admin: user.admin,
      is_active: user.is_active,
      email: user.email,
    };

    return { user: userResponse };
  }
}

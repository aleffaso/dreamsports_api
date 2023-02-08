import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { User } from "../../entities/User";

class ListUsersService {
  async execute() {
    const userRepo = AppDataSource.getRepository(User);

    const users = await userRepo.find();

    return instanceToPlain(users);
  }
}

export { ListUsersService };

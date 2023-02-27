import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { User as UserTable } from "../../entities/User";

class ListUsersService {
  async execute() {
    const userRepo = AppDataSource.getRepository(UserTable);

    const users = await userRepo.find();

    return instanceToPlain(users);
  }
}

export { ListUsersService };

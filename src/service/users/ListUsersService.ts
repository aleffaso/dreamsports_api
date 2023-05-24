import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { User as UserTable } from "../../entities/User";
import { DoesNotExistError } from "../../errors";

export class ListUsersService {
  async execute() {
    try {
      const userRepo = AppDataSource.getRepository(UserTable);

      const users = await userRepo.find();

      if (!users) {
        throw new DoesNotExistError("Users do not exist");
      }

      return instanceToPlain(users);
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

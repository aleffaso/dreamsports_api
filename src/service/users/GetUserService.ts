import { AppDataSource } from "../../data-source";

import { User as UserTable } from "../../entities/User";
import { DoesNotExistError } from "../../errors";
import { UserId, UserResponse } from "./types";

export class GetUserService {
  async execute({ id }: UserId) {
    try {
      const userRepo = AppDataSource.getRepository(UserTable);

      const user = await userRepo.findOne({ where: { id } });

      if (!user) {
        throw new DoesNotExistError("User does not exist");
      }

      const userResponse: UserResponse = {
        id: id,
        name: user.name,
        admin: user.admin,
        is_active: user.is_active,
        email: user.email,
      };

      return { user: userResponse };
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

import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { UserId } from "./types";

class DeleteUserService {
  async execute({ id }: UserId) {
    const userRepo = AppDataSource.getRepository(UserTable);
    const userId = await userRepo.findOne({ where: { id } });

    if (!userId) {
      throw {
        status: 401,
        message: "User does not exist",
      };
    }

    return await userRepo.delete({
      id,
    });
  }
}

export { DeleteUserService };

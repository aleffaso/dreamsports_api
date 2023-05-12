import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { DoesNotExistError } from "../../errors";
import { UserId } from "./types";

export class DeleteUserService {
  async execute({ id }: UserId) {
    const userRepo = AppDataSource.getRepository(UserTable);
    const userId = await userRepo.findOne({ where: { id } });

    if (!userId) {
      throw new DoesNotExistError("User does not exist");
    }

    return await userRepo.delete({
      id,
    });
  }
}

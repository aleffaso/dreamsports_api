import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { UserJWTToken as UserJWTTokenTable } from "../../entities/UserJWTToken";
import { DoesNotExistError } from "../../errors";
import { UserId } from "./types";

export class DeleteUserService {
  async execute({ id }: UserId) {
    try {
      const userRepo = AppDataSource.getRepository(UserTable);
      const user = await userRepo.findOne({ where: { id } });

      if (!user) {
        throw new DoesNotExistError("User does not exist");
      }

      const tokenRepo = AppDataSource.getRepository(UserJWTTokenTable);
      const generatedToken = await tokenRepo.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });

      if (!generatedToken) {
        throw new DoesNotExistError("Token does not exist");
      }

      await tokenRepo.delete({ user });

      return await userRepo.delete({ id });
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

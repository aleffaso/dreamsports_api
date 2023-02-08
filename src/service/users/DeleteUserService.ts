import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

interface IUserRequest {
  id?: string;
}

class DeleteUserService {
  async execute({ id }: IUserRequest) {
    const userRepo = AppDataSource.getRepository(User);
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

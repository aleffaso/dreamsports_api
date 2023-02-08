import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { User } from "../../entities/User";

interface IUserRequest {
  id: string;
}

class GetUserService {
  async execute({ id }: IUserRequest) {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id } });

    if (!user) {
      throw {
        status: 401,
        message: "User does not exist",
      };
    }

    return instanceToPlain(user);
  }
}

export { GetUserService };

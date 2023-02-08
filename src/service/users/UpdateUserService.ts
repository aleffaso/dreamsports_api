import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

interface IUserRequest {
  id: string;
  name?: string;
  email?: string;
  admin: boolean;
  password?: string;
}

class UpdateUserService {
  async execute({ id, name, email, admin = false, password }: IUserRequest) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });

    if (!user) {
      throw {
        status: 401,
        message: "User does not exist",
      };
    }

    const updateUser = userRepo.create({
      ...user,
      name: name,
      email: email,
      admin: admin,
      password: password,
    });

    await userRepo.save(updateUser);

    return { updateUser };
  }
}

export { UpdateUserService };

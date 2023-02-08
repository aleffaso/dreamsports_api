import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const userRepo = AppDataSource.getRepository(User);
    const userAlreadyExists = await userRepo.findOne({ where: { email } });

    if (userAlreadyExists) {
      throw {
        status: 409,
        message: "User already exists",
      };
    }

    const user = userRepo.create({
      name,
      email,
      admin,
      password,
    });

    await userRepo.save(user);

    return { user };
  }
}

export { CreateUserService };

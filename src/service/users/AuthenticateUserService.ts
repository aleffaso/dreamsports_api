import bcrypt from "bcryptjs";

import { AppDataSource } from "../../data-source";
import { User as UserTable } from "../../entities/User";
import { UserJWTTokenResponse, UserRequest, UserResponse } from "./types";
import { DoesNotExistError } from "../../errors";
import { CreateJWTUserService } from "./refresh_token/CreateJWTUserService";
class AuthenticateUserService {
  async execute({ email, password }: UserRequest) {
    try {
      const userRepo = AppDataSource.getRepository(UserTable);
      const user = await userRepo.findOne({ where: { email } });

      if (!user) {
        throw new DoesNotExistError("Data does not match");
      }

      const isValidPassword = await bcrypt.compare(
        password as string,
        user.password
      );

      if (!isValidPassword) {
        throw new DoesNotExistError("Data does not match");
      }

      const userResponse: UserResponse = {
        id: user.id,
        name: user.name,
        admin: user.admin,
        is_active: user.is_active,
        email: email,
      };

      const createJWTUserService = new CreateJWTUserService();
      const { token, refresh_token } = (await createJWTUserService.execute({
        ...user,
      })) as UserJWTTokenResponse;

      return {
        user: userResponse,
        token,
        refresh_token,
      };
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

export { AuthenticateUserService };

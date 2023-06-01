import jwt from "jsonwebtoken";
import { KEYS } from "../../../constants";
import { AppDataSource } from "../../../data-source";
import { UserJWTToken as UserJWTTokenTable } from "../../../entities/UserJWTToken";
import { UserResponse } from "../types";

export class CreateJWTUserService {
  async execute({ ...user }: UserResponse) {
    try {
      const jwtUserRepo = AppDataSource.getRepository(UserJWTTokenTable);

      const token = jwt.sign({ id: user.id }, KEYS.JWT.USER_TOKEN_KEY, {
        expiresIn: KEYS.JWT.TOKEN_EXPIRES_IN,
      });

      const refresh_token = jwt.sign(
        { id: user.id },
        KEYS.JWT.USER_REFRESH_TOKEN_KEY,
        {
          expiresIn: KEYS.JWT.REFRESH_TOKEN_EXPIRES_IN,
        }
      );

      const jwtUser = jwtUserRepo.create({
        token,
        refresh_token,
        user,
      });

      await jwtUserRepo.save(jwtUser);

      return { token, refresh_token };
    } catch (error) {
      console.log(error);
    }
  }
}

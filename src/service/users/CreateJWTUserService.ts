import { AppDataSource } from "../../data-source";
import { UserJWTToken as UserJWTTokenTable } from "../../entities/UserJWTToken";

export class CreateJWTUserService {
  async execute({ token, refresh_token, user }: any) {
    const jwtUserRepo = AppDataSource.getRepository(UserJWTTokenTable);

    const jwtUser = new UserJWTTokenTable();
    jwtUser.token = token;
    jwtUser.refresh_token = refresh_token;
    jwtUser.user = user;

    await jwtUserRepo.save(jwtUser);
  }
}

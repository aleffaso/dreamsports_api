import { AppDataSource } from "../../../data-source";
import { UserJWTToken as UserJWTTokenTable } from "../../../entities/UserJWTToken";
import { DoesNotExistError } from "../../../errors";
import { UserJWTTokenResponse } from "../types";

export class UpdateOldJWTRefreshTokenService {
  async execute({ refresh_token }: UserJWTTokenResponse) {
    try {
      const jwtUserRepo = AppDataSource.getRepository(UserJWTTokenTable);
      const jwtUserToken = await jwtUserRepo.findOne({
        where: { refresh_token },
      });

      if (!jwtUserToken) {
        throw new DoesNotExistError("Token does not exist");
      }

      jwtUserRepo.update(jwtUserToken.id as string, {
        active: false,
      });

      await jwtUserRepo.save(jwtUserToken);

      return;
    } catch (error) {
      console.log(error);
    }
  }
}

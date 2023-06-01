import jwt, { TokenExpiredError } from "jsonwebtoken";
import { AppDataSource } from "../../../data-source";
import { User as UserTable } from "../../../entities/User";
import { UserJWTToken as UserJWTTokenTable } from "../../../entities/UserJWTToken";
import {
  TokenPayload,
  UserJWTTokenRequest,
  UserJWTTokenResponse,
} from "../types";
import { DoesNotExistError, ForbiddenError } from "../../../errors";
import { KEYS } from "../../../constants";
import { CreateJWTUserService } from "./CreateJWTUserService";
import { UpdateOldJWTRefreshTokenService } from "./UpdateOldJWTRefreshTokenService";

class RegenerateRefreshTokenUserService {
  async execute({ refresh_token }: UserJWTTokenRequest) {
    try {
      const { id } = jwt.verify(
        refresh_token as string,
        KEYS.JWT.USER_REFRESH_TOKEN_KEY
      ) as TokenPayload;

      const tokenRepo = AppDataSource.getRepository(UserJWTTokenTable);
      const token = await tokenRepo.findOne({
        where: { refresh_token, active: true },
      });

      if (!token) {
        throw new ForbiddenError("Invalid refresh token");
      }

      const userRepo = AppDataSource.getRepository(UserTable);
      const user = await userRepo.findOne({ where: { id } });

      if (!user) {
        throw new DoesNotExistError("Data does not match");
      }

      const createJWTUserService = new CreateJWTUserService();
      const { token: new_token, refresh_token: new_refresh_token } =
        (await createJWTUserService.execute({
          ...user,
        })) as UserJWTTokenResponse;

      const updateJWTRefreshTokenService =
        new UpdateOldJWTRefreshTokenService();
      await updateJWTRefreshTokenService.execute({ refresh_token });

      return { token: new_token, refresh_token: new_refresh_token };
    } catch (error) {
      if (
        error instanceof TokenExpiredError ||
        error instanceof DoesNotExistError
      ) {
        return {
          message: error.message,
        };
      }
    }
  }
}
export { RegenerateRefreshTokenUserService };

import dayjs from "dayjs";

import { AppDataSource } from "../../data-source";
import { RefreshToken as RefreshTokenTable } from "../../entities/RefreshToken";
import { User as UserTable } from "../../entities/User";
import { UserRefreshTokenCreate, UserRefreshTokenResponse } from "./types";
import { DoesNotExistError } from "../../errors";
import { KEYS } from "../../constants";

export class RefreshTokenUserService {
  async execute({ userId }: UserRefreshTokenCreate) {
    try {
      const userRepo = AppDataSource.getRepository(UserTable);

      const user = await userRepo.findOne({ where: { id: userId } });

      if (!user) {
        throw new DoesNotExistError("User does not exist");
      }

      const tokenRepo = AppDataSource.getRepository(RefreshTokenTable);
      const generateToken = await tokenRepo.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });

      const expiresIn = dayjs().add(KEYS.JWT.EXPIRATION_TIME, "day").unix();

      if (!generateToken) {
        const token = tokenRepo.create({
          expiresIn,
          user: user,
        });
        await tokenRepo.save(token);
        const tokenResponse: UserRefreshTokenResponse = {
          id: token.id,
        };
        return tokenResponse;
      }

      tokenRepo.update(generateToken.id as string, {
        expiresIn,
        user: user,
      });

      await tokenRepo.save(generateToken);

      const tokenResponse: UserRefreshTokenResponse = {
        id: userId,
      };

      return tokenResponse;
    } catch (error) {
      if (error) {
        return {
          error,
        };
      }
    }
  }
}

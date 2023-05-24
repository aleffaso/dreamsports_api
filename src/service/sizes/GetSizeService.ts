import { AppDataSource } from "../../data-source";

import { Size as SizeTable } from "../../entities/Size";
import { DoesNotExistError } from "../../errors";
import { SizeId, SizeResponse } from "./types";

export class GetSizeService {
  async execute({ id }: SizeId) {
    try {
      const sizeRepo = AppDataSource.getRepository(SizeTable);

      const size = await sizeRepo.findOne({ where: { id } });

      if (!size) {
        throw new DoesNotExistError("Size does not exist");
      }

      const sizeResponse: SizeResponse = {
        id: size.id,
        title: size.title,
      };

      return { Size: sizeResponse };
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

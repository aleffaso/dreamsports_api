import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { Size as SizeTable } from "../../entities/Size";
import { DoesNotExistError } from "../../errors";

export class ListSizesService {
  async execute() {
    try {
      const sizeRepo = AppDataSource.getRepository(SizeTable);

      const sizes = await sizeRepo.find();

      if (!sizes) {
        throw new DoesNotExistError("Users do not exist");
      }

      return instanceToPlain(sizes);
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

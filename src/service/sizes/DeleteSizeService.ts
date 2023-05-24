import { AppDataSource } from "../../data-source";
import { Size as SizeTable } from "../../entities/Size";
import { DoesNotExistError } from "../../errors";
import { SizeId } from "./types";

export class DeleteSizeService {
  async execute({ id }: SizeId) {
    try {
      const sizeRepo = AppDataSource.getRepository(SizeTable);
      const sizeId = await sizeRepo.findOne({ where: { id } });

      if (!sizeId) {
        throw new DoesNotExistError("Size does not exist");
      }

      return await sizeRepo.delete({
        id,
      });
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

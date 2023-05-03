import { AppDataSource } from "../../data-source";
import { Size as SizeTable } from "../../entities/Size";
import { SizeId } from "./types";

export class DeleteSizeService {
  async execute({ id }: SizeId) {
    const sizeRepo = AppDataSource.getRepository(SizeTable);
    const sizeId = await sizeRepo.findOne({ where: { id } });

    if (!sizeId) {
      throw new DoesNotExistError("Size does not exist");
    }

    return await sizeRepo.delete({
      id,
    });
  }
}

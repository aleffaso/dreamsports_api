import { AppDataSource } from "../../data-source";
import { Size as SizeTable } from "../../entities/Size";
import { SizeUpdate, SizeResponse } from "./types";

export class UpdateSizeService {
  async execute({ id, title }: SizeUpdate) {
    const sizeRepo = AppDataSource.getRepository(SizeTable);
    const size = await sizeRepo.findOne({ where: { id } });

    if (!size) {
      throw new DoesNotExistError("Size does not exist");
    }

    if (title === size.title) {
      throw new AlreadyExistsError("Size already exists");
    }

    await sizeRepo.update(id as number, {
      title: title,
    });

    const sizeResponse: SizeResponse = {
      id: id,
      title,
    };

    return { size: sizeResponse };
  }
}

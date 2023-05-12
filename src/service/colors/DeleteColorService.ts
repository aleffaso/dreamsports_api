import { AppDataSource } from "../../data-source";
import { Color as ColorTable } from "../../entities/Color";
import { DoesNotExistError } from "../../errors";
import { ColorId } from "./types";

export class DeleteColorService {
  async execute({ id }: ColorId) {
    const colorRepo = AppDataSource.getRepository(ColorTable);
    const colorId = await colorRepo.findOne({ where: { id } });

    if (!colorId) {
      throw new DoesNotExistError("Color does not exist");
    }

    return await colorRepo.delete({
      id,
    });
  }
}

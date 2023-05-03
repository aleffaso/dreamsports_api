import { AppDataSource } from "../../data-source";
import { Color as ColorTable } from "../../entities/Color";
import { ColorUpdate, ColorResponse } from "./types";

export class UpdateColorService {
  async execute({ id, title }: ColorUpdate) {
    const colorRepo = AppDataSource.getRepository(ColorTable);
    const color = await colorRepo.findOne({ where: { id } });

    if (!color) {
      throw new DoesNotExistError("Color does not exist");
    }

    if (title === color.title) {
      throw new AlreadyExistsError("Color already exists");
    }

    await colorRepo.update(id as number, {
      title: title,
    });

    const colorResponse: ColorResponse = {
      id: id,
      title,
    };

    return { color: colorResponse };
  }
}

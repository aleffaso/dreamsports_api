import { AppDataSource } from "../../data-source";

import { Color as ColorTable } from "../../entities/Color";
import { ColorId, ColorResponse } from "./types";

export class GetColorService {
  async execute({ id }: ColorId) {
    const colorRepo = AppDataSource.getRepository(ColorTable);

    const color = await colorRepo.findOne({ where: { id } });

    if (!color) {
      throw new DoesNotExistError("Color does not exist");
    }

    const colorResponse: ColorResponse = {
      id: color.id,
      title: color.title,
    };

    return { color: colorResponse };
  }
}

import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { Color as ColorTable } from "../../entities/Color";

export class ListColorsService {
  async execute() {
    const colorRepo = AppDataSource.getRepository(ColorTable);

    const colors = await colorRepo.find();

    return instanceToPlain(colors);
  }
}

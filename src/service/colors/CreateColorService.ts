import { AppDataSource } from "../../data-source";
import { Color as ColorTable } from "../../entities/Color";
import { AlreadyExistsError } from "../../errors";
import { Color, ColorCreate } from "./types";

export class CreateColorService {
  async execute({ title }: ColorCreate) {
    const colorRepo = AppDataSource.getRepository(ColorTable);
    const colorAlreadyExists = await colorRepo.findOne({
      where: { title },
    });

    if (colorAlreadyExists) {
      throw new AlreadyExistsError("Color already exists");
    }

    const color = colorRepo.create({
      title,
    });

    await colorRepo.save(color);

    const colorResponse: Color = {
      id: color.id,
      title: title,
    };

    return { brand: colorResponse };
  }
}

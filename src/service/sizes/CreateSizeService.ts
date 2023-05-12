import { AppDataSource } from "../../data-source";
import { Size as SizeTable } from "../../entities/Size";
import { AlreadyExistsError } from "../../errors";
import { Size, SizeCreate } from "./types";

export class CreateSizeService {
  async execute({ title }: SizeCreate) {
    const sizeRepo = AppDataSource.getRepository(SizeTable);
    const sizeAlreadyExists = await sizeRepo.findOne({
      where: { title },
    });

    if (sizeAlreadyExists) {
      throw new AlreadyExistsError("Size already exists");
    }

    const size = sizeRepo.create({
      title,
    });

    await sizeRepo.save(size);

    const sizeResponse: Size = {
      id: size.id,
      title: title,
    };

    return { brand: sizeResponse };
  }
}

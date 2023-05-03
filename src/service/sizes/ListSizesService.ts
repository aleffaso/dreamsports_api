import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { Size as SizeTable } from "../../entities/Size";

export class ListSizesService {
  async execute() {
    const sizeRepo = AppDataSource.getRepository(SizeTable);

    const sizes = await sizeRepo.find();

    return instanceToPlain(sizes);
  }
}

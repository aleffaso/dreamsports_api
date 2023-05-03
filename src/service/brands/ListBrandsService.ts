import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { Category as CategoryTable } from "../../entities/Category";

export class ListBrandsService {
  async execute() {
    const categoryRepo = AppDataSource.getRepository(CategoryTable);

    const categories = await categoryRepo.find();

    return instanceToPlain(categories);
  }
}

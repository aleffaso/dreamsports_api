import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { Brand as BrandTable } from "../../entities/Brand";

export class ListBrandsService {
  async execute() {
    const brandRepo = AppDataSource.getRepository(BrandTable);

    const brands = await brandRepo.find();

    return instanceToPlain(brands);
  }
}

import { AppDataSource } from "../../data-source";

import { Brand as BrandTable } from "../../entities/Brand";
import { BrandId, BrandResponse } from "./types";

export class GetBrandService {
  async execute({ id }: BrandId) {
    const brandRepo = AppDataSource.getRepository(BrandTable);

    const brand = await brandRepo.findOne({ where: { id } });

    if (!brand) {
      throw new DoesNotExistError("The brand does not exist");
    }

    const brandResponse: BrandResponse = {
      id: brand.id,
      title: brand.title,
    };

    return { brand: brandResponse };
  }
}

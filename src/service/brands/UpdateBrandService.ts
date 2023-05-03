import slugify from "slugify";
import { AppDataSource } from "../../data-source";
import { Brand as BrandTable } from "../../entities/Brand";
import { BrandUpdate, BrandResponse } from "./types";

export class UpdateBrandService {
  async execute({ id, title }: BrandUpdate) {
    const brandRepo = AppDataSource.getRepository(BrandTable);
    const brand = await brandRepo.findOne({ where: { id } });

    if (!brand) {
      throw {
        status: 401,
        message: "Brand does not exist",
      };
    }

    if (title === brand.title) {
      throw {
        status: 409,
        message: "Brand already exists",
      };
    }

    await brandRepo.update(id as number, {
      title: title,
    });

    const brandResponse: BrandResponse = {
      id: id,
      title,
    };

    return { brand: brandResponse };
  }
}

import { AppDataSource } from "../../data-source";
import { Brand as BrandTable } from "../../entities/Brand";
import { BrandUpdate, BrandResponse } from "./types";

export class UpdateBrandService {
  async execute({ id, title }: BrandUpdate) {
    const brandRepo = AppDataSource.getRepository(BrandTable);
    const brand = await brandRepo.findOne({ where: { id } });

    if (!brand) {
      throw new DoesNotExistError("Brand does not exist");
    }

    if (title === brand.title) {
      throw new AlreadyExistsError("Brand already exists");
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

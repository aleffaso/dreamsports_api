import { AppDataSource } from "../../data-source";
import { Brand as BrandTable } from "../../entities/Brand";
import { Brand, BrandCreate } from "./types";

export class CreateBrandService {
  async execute({ title }: BrandCreate) {
    const brandRepo = AppDataSource.getRepository(BrandTable);
    const brandAlreadyExists = await brandRepo.findOne({
      where: { title },
    });

    if (brandAlreadyExists) {
      throw {
        status: 409,
        message: "Brand already exists",
      };
    }

    const brand = brandRepo.create({
      title,
    });

    await brandRepo.save(brand);

    const brandResponse: Brand = {
      id: brand.id,
      title: title,
    };

    return { brand: brandResponse };
  }
}

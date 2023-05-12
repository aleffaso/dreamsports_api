import { AppDataSource } from "../../data-source";
import { Brand as BrandTable } from "../../entities/Brand";
import { DoesNotExistError } from "../../errors";
import { BrandId } from "./types";

export class DeleteBrandService {
  async execute({ id }: BrandId) {
    const brandRepo = AppDataSource.getRepository(BrandTable);
    const brandId = await brandRepo.findOne({ where: { id } });

    if (!brandId) {
      throw new DoesNotExistError("Brand does not exist");
    }

    return await brandRepo.delete({
      id,
    });
  }
}

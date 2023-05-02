import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { Product as ProductTable } from "../../entities/Product";

export class ListProductsService {
  async execute() {
    const productRepo = AppDataSource.getRepository(ProductTable);
    const products = await productRepo.find({ relations: ["categories"] });

    return instanceToPlain(products);
  }
}

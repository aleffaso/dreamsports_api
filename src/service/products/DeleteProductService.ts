import { AppDataSource } from "../../data-source";
import { Product as ProductTable } from "../../entities/Product";
import { ProductId } from "./types";

export class DeleteProductService {
  async execute({ id }: ProductId) {
    const productRepo = AppDataSource.getRepository(ProductTable);
    const productId = await productRepo.findOne({ where: { id } });

    if (!productId) {
      throw {
        status: 401,
        message: "Product does not exist",
      };
    }

    return await productRepo.delete({
      id,
    });
  }
}

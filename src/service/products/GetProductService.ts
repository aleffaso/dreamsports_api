import { AppDataSource } from "../../data-source";

import { Product as ProductTable } from "../../entities/Product";
import { ProductId, ProductResponse } from "./types";

export class GetProductService {
  async execute({ id }: ProductId) {
    const userRepo = AppDataSource.getRepository(ProductTable);

    const product = await userRepo.findOne({
      where: { id },
      relations: {
        categories: true,
        colors: true,
        sizes: true,
        images: true,
      },
    });

    if (!product) {
      throw new DoesNotExistError("Product does not exist");
    }

    if (!product.is_active) {
      throw new ForbiddenError("Product forbidden");
    }

    const productResponse: ProductResponse = {
      id: product.id,
      title: product.title,
      rate: product.rate,
      price: product.price,
      info: product.info,
      description: product.description,
      specifications: product.specifications,
      inventory: product.inventory,
      slug: product.slug,
      categories: product.categories,
      brands: product.brands,
      colors: product.colors,
      sizes: product.sizes,
      images: product.images,
    };

    return { product: productResponse };
  }
}

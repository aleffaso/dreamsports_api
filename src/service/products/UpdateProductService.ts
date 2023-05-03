import slugify from "slugify";
import { AppDataSource } from "../../data-source";
import { Product as ProductTable } from "../../entities/Product";
import { ProductUpdate, ProductResponse } from "./types";

export class UpdateProductService {
  async execute({
    id,
    title,
    rate,
    price,
    info,
    description,
    specifications,
    inventory,
    is_active,
    categories,
    brands,
    colors,
    sizes,
    images,
  }: ProductUpdate) {
    const productRepo = AppDataSource.getRepository(ProductTable);
    const product = await productRepo.findOne({ where: { id } });

    if (!product) {
      throw new DoesNotExistError("Product does not exist");
    }

    if (title === product.title) {
      throw new AlreadyExistsError("Product already exists");
    }

    const updatedSlug = slugify(title as string, { lower: true });

    await productRepo.update(id as string, {
      title,
      rate,
      price,
      info,
      description,
      specifications,
      inventory,
      slug: updatedSlug,
      is_active,
      categories,
      brands,
      colors,
      sizes,
      images,
    });

    const productResponse: ProductResponse = {
      id: id,
      title,
      rate,
      price,
      info,
      description,
      specifications,
      inventory,
      slug: updatedSlug,
      is_active,
      categories,
      brands,
      colors,
      sizes,
      images,
    };

    return { product: productResponse };
  }
}

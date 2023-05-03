import { AppDataSource } from "../../data-source";
import { Product, ProductCreate } from "./types";
import { Product as ProductTable } from "../../entities/Product";
import { Category } from "../../entities/Category";
import { Brand } from "../../entities/Brand";
import { Color } from "../../entities/Color";
import { Size } from "../../entities/Size";
import { Image } from "../../entities/Image";

export class CreateProductService {
  async execute({
    title,
    rate,
    price,
    info,
    description,
    specifications,
    inventory,
    is_active = true,
    categories,
    brands,
    colors,
    sizes,
    images,
  }: ProductCreate) {
    const productRepo = AppDataSource.getRepository(ProductTable);
    const categoryRepo = AppDataSource.getRepository(Category);
    const brandRepo = AppDataSource.getRepository(Brand);
    const colorRepo = AppDataSource.getRepository(Color);
    const sizeRepo = AppDataSource.getRepository(Size);
    const imageRepo = AppDataSource.getRepository(Image);

    const categoryIds = categories?.map((category) => category.id);
    const brandIds = brands?.map((brand) => brand.id);
    const colorIds = colors?.map((color) => color.id);
    const sizeIds = sizes?.map((size) => size.id);
    const imageIds = images?.map((image) => image.id);

    const categoryRows = await categoryRepo
      .createQueryBuilder("categories")
      .whereInIds(categoryIds)
      .getMany();

    const brandRows = await brandRepo
      .createQueryBuilder("brands")
      .whereInIds(brandIds)
      .getMany();

    const colorRows = await colorRepo
      .createQueryBuilder("colors")
      .whereInIds(colorIds)
      .getMany();

    const sizeRows = await sizeRepo
      .createQueryBuilder("sizes")
      .whereInIds(sizeIds)
      .getMany();

    const imageRows = await imageRepo
      .createQueryBuilder("images")
      .whereInIds(imageIds)
      .getMany();

    const product = productRepo.create({
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
    });

    await productRepo.save(product);

    const productCreateResponse: Product = {
      id: product.id,
      title: title,
      rate: rate,
      price: price,
      info: info,
      description: description,
      specifications: specifications,
      inventory: inventory,
      slug: product.slug,
      categories: categoryRows,
      brands: brandRows,
      colors: colorRows,
      sizes: sizeRows,
      images: imageRows,
    };

    return { product: productCreateResponse };
  }
}

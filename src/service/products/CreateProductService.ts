import { AppDataSource } from "../../data-source";
import { Product, ProductCreate } from "./types";
import { Product as ProductTable } from "../../entities/Product";
import { Color } from "../../entities/Color";
import { Category } from "../../entities/Category";
import { Size } from "../../entities/Size";
import { Image } from "../../entities/Images";

export class CreateProductService {
  async execute({
    title,
    rate,
    price,
    brand,
    info,
    description,
    specifications,
    inventory,
    slug,
    is_active = true,
    categories,
    colors,
    sizes,
    images,
  }: ProductCreate) {
    const productRepo = AppDataSource.getRepository(ProductTable);
    const categoriesRepo = AppDataSource.getRepository(Category);
    const colorsRepo = AppDataSource.getRepository(Color);
    const sizesRepo = AppDataSource.getRepository(Size);
    const imagesRepo = AppDataSource.getRepository(Image);

    const categoryValues = [];
    const colorValues = [];
    const sizeValues = [];
    const imageValues = [];

    // const productAlreadyExists = await productRepo.findOne({
    //   where: { title },
    // });

    // if (productAlreadyExists) {
    //   throw {
    //     status: 409,
    //     message: "Product already exists",
    //   };
    // }

    // const categoryArray = categories?.map((value) => {
    //   return categoryValues.push(value.id);
    // });

    // const colorArray = categories?.map((value) => {
    //   return colorValues.push(value.id);
    // });

    // const sizeArray = categories?.map((value) => {
    //   return sizeValues.push(value.id);
    // });

    // const imageArray = categories?.map((value) => {
    //   return imageValues.push(value.id);
    // });

    // const product = productRepo.create({
    //   title,
    //   rate,
    //   price,
    //   brand,
    //   info,
    //   description,
    //   specifications,
    //   inventory,
    //   slug,
    //   is_active,
    //   categoryValues,
    //   colorArray,
    //   sizeArray,
    //   imageArray,
    // });

    // await productRepo.save(product);

    // const productResponse: Product = {
    //   id: product.id,
    //   title: title,
    //   rate: rate,
    //   price: price,
    //   brand: brand,
    //   info: info,
    //   description: description,
    //   specifications: specifications,
    //   inventory: inventory,
    //   slug: slug,
    //   categories: categories,
    //   colors: colors,
    //   sizes: sizes,
    //   images: images,
    // };

    return { product: categories };
  }
}

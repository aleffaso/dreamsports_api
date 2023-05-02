import { AppDataSource } from "../../data-source";
import { Category as CategoryTable } from "../../entities/Category";
import { Category, CategoryCreate } from "./types";

export class CreateCategoryService {
  async execute({ href, src, title }: CategoryCreate) {
    const categoryRepo = AppDataSource.getRepository(CategoryTable);
    const categoryAlreadyExists = await categoryRepo.findOne({
      where: { title },
    });

    if (categoryAlreadyExists) {
      throw {
        status: 409,
        message: "Category already exists",
      };
    }

    const category = categoryRepo.create({
      href,
      src,
      title,
    });

    await categoryRepo.save(category);

    const categoryResponse: Category = {
      id: category.id,
      href: href,
      src: src,
      title: title,
      slug: category.slug,
    };

    return { category: categoryResponse };
  }
}

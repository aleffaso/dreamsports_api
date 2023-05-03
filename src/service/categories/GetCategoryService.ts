import { AppDataSource } from "../../data-source";

import { Category as CategoryTable } from "../../entities/Category";
import { CategoryId, CategoryResponse } from "./types";

export class GetCategoryService {
  async execute({ id }: CategoryId) {
    const categoryRepo = AppDataSource.getRepository(CategoryTable);

    const category = await categoryRepo.findOne({ where: { id } });

    if (!category) {
      throw {
        status: 401,
        message: "Category does not exist",
      };
    }

    const categoryResponse: CategoryResponse = {
      id: category.id,
      href: category.href,
      src: category.src,
      title: category.title,
      slug: category.slug,
    };

    return { category: categoryResponse };
  }
}

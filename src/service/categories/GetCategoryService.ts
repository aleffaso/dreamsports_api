import { AppDataSource } from "../../data-source";

import { Category as CategoryTable } from "../../entities/Category";
import { DoesNotExistError } from "../../errors";
import { CategoryId, CategoryResponse } from "./types";

export class GetCategoryService {
  async execute({ id }: CategoryId) {
    const categoryRepo = AppDataSource.getRepository(CategoryTable);

    const category = await categoryRepo.findOne({ where: { id } });

    if (!category) {
      throw new DoesNotExistError("Category does not exist");
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

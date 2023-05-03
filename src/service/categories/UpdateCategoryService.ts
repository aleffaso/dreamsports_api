import slugify from "slugify";
import { AppDataSource } from "../../data-source";
import { Category as CategoryTable } from "../../entities/Category";
import { CategoryUpdate, CategoryResponse } from "./types";

export class UpdateCategoryService {
  async execute({ id, href, src, title }: CategoryUpdate) {
    const categoryRepo = AppDataSource.getRepository(CategoryTable);
    const category = await categoryRepo.findOne({ where: { id } });

    if (!category) {
      throw new DoesNotExistError("Category does not exist");
    }

    if (title === category.title) {
      throw new AlreadyExistsError("Already exists");
    }

    const updatedSlug = slugify(title as string, { lower: true });

    await categoryRepo.update(id as number, {
      href: href,
      src: src,
      title: title,
      slug: updatedSlug,
    });

    const categoryResponse: CategoryResponse = {
      id: id,
      href,
      src,
      title,
      slug: updatedSlug,
    };

    return { category: categoryResponse };
  }
}

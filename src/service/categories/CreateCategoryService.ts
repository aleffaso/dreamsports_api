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

    const user = categoryRepo.create({
      href,
      src,
      title,
    });

    await categoryRepo.save(user);

    const categoryResponse: Category = {
      id: user.id,
      href: href,
      src: src,
      title: title,
    };

    return { user: categoryResponse };
  }
}

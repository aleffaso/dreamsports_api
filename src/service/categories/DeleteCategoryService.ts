import { AppDataSource } from "../../data-source";
import { Category as CategoryTable } from "../../entities/Category";
import { CategoryId } from "./types";

export class DeleteCategoryService {
  async execute({ id }: CategoryId) {
    const categoryRepo = AppDataSource.getRepository(CategoryTable);
    const categoryId = await categoryRepo.findOne({ where: { id } });

    if (!categoryId) {
      throw {
        status: 401,
        message: "Category does not exist",
      };
    }

    return await categoryRepo.delete({
      id,
    });
  }
}

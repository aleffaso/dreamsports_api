import { Request, Response } from "express";
import { CreateCategoryService } from "../../service/categories/CreateCategoryService";
import { ListCategoriesService } from "../../service/categories/ListCategoriesService";
import { GetCategoryService } from "../../service/categories/GetCategoryService";
import { UpdateCategoryService } from "../../service/categories/UpdateCategoryService";
import { DeleteCategoryService } from "../../service/categories/DeleteCategoryService";

export default new (class CategoryController {
  async create(req: Request, res: Response) {
    const { href, src, title } = req.body;

    try {
      const createCategoryService = new CreateCategoryService();

      const categoryRequest = await createCategoryService.execute({
        href,
        src,
        title,
      });

      return res.json(categoryRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const listCategoriesService = new ListCategoriesService();

      const categories = await listCategoriesService.execute();

      return res.json(categories);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const getCategoryService = new GetCategoryService();

      const category = await getCategoryService.execute({ id: idNumber });

      return res.json(category);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { href, src, title } = req.body;
    const idNumber = parseInt(id);
    try {
      const updateCategoryService = new UpdateCategoryService();

      const categoryRequest = await updateCategoryService.execute({
        id: idNumber,
        href,
        src,
        title,
      });

      return res.json(categoryRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const deleteCategoryService = new DeleteCategoryService();

      await deleteCategoryService.execute({
        id: idNumber,
      });

      return res.status(200).json({
        message: "Deleted successfully",
      });
    } catch (error) {
      res.json({ error: error });
    }
  }
})();

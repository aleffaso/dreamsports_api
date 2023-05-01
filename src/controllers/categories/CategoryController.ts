import { Request, Response } from "express";
import { CreateCategoryService } from "../../service/categories/CreateCategoryService";

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
})();

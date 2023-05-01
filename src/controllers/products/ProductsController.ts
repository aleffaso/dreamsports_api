import { Request, Response } from "express";
import { CreateProductService } from "../../service/products/CreateProductService";

export default new (class ProductController {
  async create(req: Request, res: Response) {
    const {
      title,
      rate,
      price,
      brand,
      info,
      description,
      specifications,
      inventory,
      slug,
      is_active,
      categories,
    } = req.body;

    // try {
    //   const createProductService = new CreateProductService();

    //   const categoryRequest = await createProductService.execute({
    //     title,
    //     rate,
    //     price,
    //     brand,
    //     info,
    //     description,
    //     specifications,
    //     inventory,
    //     slug,
    //     is_active,
    //     categories,
    //   });

    //   return res.json(categoryRequest);
    // } catch (error) {
    //   res.json({ error: error });
    // }
  }
})();

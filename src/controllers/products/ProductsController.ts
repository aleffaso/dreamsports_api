import { Request, Response } from "express";
import { CreateProductService } from "../../service/products/CreateProductService";
import { ListProductsService } from "../../service/products/ListProductsService";

export default new (class ProductController {
  async create(req: Request, res: Response) {
    const {
      title,
      rate,
      price,
      info,
      description,
      specifications,
      inventory,
      is_active,
      categories,
      brands,
      colors,
      sizes,
      images,
    } = req.body;

    try {
      const createProductService = new CreateProductService();

      const productRequest = await createProductService.execute({
        title,
        rate,
        price,
        info,
        description,
        specifications,
        inventory,
        is_active,
        categories,
        brands,
        colors,
        sizes,
        images,
      });

      return res.json(productRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const listProductsService = new ListProductsService();

      const products = await listProductsService.execute();

      return res.json(products);
    } catch (error) {
      res.json({ error: error });
    }
  }
})();

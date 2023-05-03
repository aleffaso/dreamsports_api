import { Request, Response } from "express";
import { CreateProductService } from "../../service/products/CreateProductService";
import { ListProductsService } from "../../service/products/ListProductsService";
import { GetProductService } from "../../service/products/GetProductService";
import { UpdateProductService } from "../../service/products/UpdateProductService";
import { DeleteProductService } from "../../service/products/DeleteProductService";

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

  async get(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const getProductService = new GetProductService();

      const product = await getProductService.execute({ id });

      return res.json(product);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
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
      const updateProductService = new UpdateProductService();

      const productRequest = await updateProductService.execute({
        id,
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

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleteProductService = new DeleteProductService();

      await deleteProductService.execute({
        id,
      });

      return res.status(200).json({
        message: "Deleted successfully",
      });
    } catch (error) {
      res.json({ error: error });
    }
  }
})();

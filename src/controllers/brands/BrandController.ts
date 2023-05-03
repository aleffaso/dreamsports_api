import { Request, Response } from "express";
import { CreateBrandService } from "../../service/brands/CreateBrandService";
import { ListBrandsService } from "../../service/brands/ListBrandsService";
import { GetBrandService } from "../../service/brands/GetBrandService";
import { UpdateBrandService } from "../../service/brands/UpdateBrandService";
import { DeleteBrandService } from "../../service/brands/DeleteBrandService";

export default new (class BrandController {
  async create(req: Request, res: Response) {
    const { title } = req.body;

    try {
      const createBrandService = new CreateBrandService();

      const brandRequest = await createBrandService.execute({
        title,
      });

      return res.json(brandRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const listBrandsService = new ListBrandsService();

      const brands = await listBrandsService.execute();

      return res.json(brands);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const getBrandService = new GetBrandService();

      const brand = await getBrandService.execute({ id: idNumber });

      return res.json(brand);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title } = req.body;
    const idNumber = parseInt(id);
    try {
      const updateBrandService = new UpdateBrandService();

      const brandRequest = await updateBrandService.execute({
        id: idNumber,
        title,
      });

      return res.json(brandRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const deleteBrandService = new DeleteBrandService();

      await deleteBrandService.execute({
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

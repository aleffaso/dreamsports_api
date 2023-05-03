import { Request, Response } from "express";
import { CreateSizeService } from "../../service/sizes/CreateSizeService";
import { ListSizesService } from "../../service/sizes/ListSizesService";
import { GetSizeService } from "../../service/sizes/GetSizeService";
import { UpdateSizeService } from "../../service/sizes/UpdateSizeService";
import { DeleteSizeService } from "../../service/sizes/DeleteSizeService";

export default new (class SizeController {
  async create(req: Request, res: Response) {
    const { title } = req.body;

    try {
      const createSizeService = new CreateSizeService();

      const sizeRequest = await createSizeService.execute({
        title,
      });

      return res.json(sizeRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const listSizesService = new ListSizesService();

      const sizes = await listSizesService.execute();

      return res.json(sizes);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const getSizeService = new GetSizeService();

      const size = await getSizeService.execute({ id: idNumber });

      return res.json(size);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title } = req.body;
    const idNumber = parseInt(id);
    try {
      const updateSizeService = new UpdateSizeService();

      const sizeRequest = await updateSizeService.execute({
        id: idNumber,
        title,
      });

      return res.json(sizeRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const deleteSizeService = new DeleteSizeService();

      await deleteSizeService.execute({
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

import { Request, Response } from "express";
import { CreateColorService } from "../../service/colors/CreateColorService";
import { ListColorsService } from "../../service/colors/ListColorsService";
import { GetColorService } from "../../service/colors/GetColorService";
import { UpdateColorService } from "../../service/colors/UpdateColorService";
import { DeleteColorService } from "../../service/colors/DeleteColorService";

export default new (class ColorController {
  async create(req: Request, res: Response) {
    const { title } = req.body;

    try {
      const createColorService = new CreateColorService();

      const colorRequest = await createColorService.execute({
        title,
      });

      return res.json(colorRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const listColorsService = new ListColorsService();

      const colors = await listColorsService.execute();

      return res.json(colors);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const getColorService = new GetColorService();

      const color = await getColorService.execute({ id: idNumber });

      return res.json(color);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title } = req.body;
    const idNumber = parseInt(id);
    try {
      const updateColorService = new UpdateColorService();

      const colorRequest = await updateColorService.execute({
        id: idNumber,
        title,
      });

      return res.json(colorRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const deleteColorService = new DeleteColorService();

      await deleteColorService.execute({
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

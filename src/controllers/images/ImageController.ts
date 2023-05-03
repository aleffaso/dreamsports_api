import { Request, Response } from "express";
import { CreateImageService } from "../../service/images/CreateImageService";
import { ListImagesService } from "../../service/images/ListImagesService";
import { GetImageService } from "../../service/images/GetImageService";
import { UpdateImageService } from "../../service/images/UpdateImageService";
import { DeleteImageService } from "../../service/images/DeleteImageService";

export default new (class ImageController {
  async create(req: Request, res: Response) {
    const { title, src, main } = req.body;

    try {
      const createImageService = new CreateImageService();

      const imageRequest = await createImageService.execute({
        title,
        src,
        main,
      });

      return res.json(imageRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const listImagesService = new ListImagesService();

      const images = await listImagesService.execute();

      return res.json(images);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const getImageService = new GetImageService();

      const image = await getImageService.execute({ id: idNumber });

      return res.json(image);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, src, main } = req.body;
    const idNumber = parseInt(id);
    try {
      const updateImageService = new UpdateImageService();

      const imageRequest = await updateImageService.execute({
        id: idNumber,
        title,
        src,
        main,
      });

      return res.json(imageRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const deleteImageService = new DeleteImageService();

      await deleteImageService.execute({
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

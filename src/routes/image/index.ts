import { Router } from "express";
import ImageController from "../../controllers/images/ImageController";
import authMiddleware from "../../middlewares/authMiddleware";

const imageRouter = Router();

imageRouter.post("/image", authMiddleware, ImageController.create);
imageRouter.put("/image/:id", authMiddleware, ImageController.update);
imageRouter.get("/image/:id", ImageController.get);
imageRouter.delete("/image/:id", authMiddleware, ImageController.delete);
imageRouter.get("/images", authMiddleware, ImageController.list);

export default imageRouter;

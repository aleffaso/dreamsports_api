import { Router } from "express";
import ImageController from "../../controllers/images/ImageController";
import userAuthMiddleware from "../../middlewares/userAuthMiddleware";

const imageRouter = Router();

imageRouter.post("/image", userAuthMiddleware, ImageController.create);
imageRouter.put("/image/:id", userAuthMiddleware, ImageController.update);
imageRouter.get("/image/:id", ImageController.get);
imageRouter.delete("/image/:id", userAuthMiddleware, ImageController.delete);
imageRouter.get("/images", ImageController.list);

export default imageRouter;

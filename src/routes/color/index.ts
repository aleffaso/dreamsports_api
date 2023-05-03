import { Router } from "express";
import ColorController from "../../controllers/colors/ColorController";
import userAuthMiddleware from "../../middlewares/userAuthMiddleware";

const colorRouter = Router();

colorRouter.post("/color", userAuthMiddleware, ColorController.create);
colorRouter.put("/color/:id", userAuthMiddleware, ColorController.update);
colorRouter.get("/color/:id", ColorController.get);
colorRouter.delete("/color/:id", userAuthMiddleware, ColorController.delete);
colorRouter.get("/colors", ColorController.list);

export default colorRouter;

import { Router } from "express";
import ColorController from "../../controllers/colors/ColorController";
import authMiddleware from "../../middlewares/authMiddleware";

const colorRouter = Router();

colorRouter.post("/color", authMiddleware, ColorController.create);
colorRouter.put("/color/:id", authMiddleware, ColorController.update);
colorRouter.get("/color/:id", ColorController.get);
colorRouter.delete("/color/:id", authMiddleware, ColorController.delete);
colorRouter.get("/colors", ColorController.list);

export default colorRouter;

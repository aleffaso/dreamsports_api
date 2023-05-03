import { Router } from "express";
import BrandController from "../../controllers/brands/BrandController";
import authMiddleware from "../../middlewares/authMiddleware";

const brandRouter = Router();

brandRouter.post("/brand", authMiddleware, BrandController.create);
brandRouter.put("/brand/:id", authMiddleware, BrandController.update);
brandRouter.get("/brand/:id", BrandController.get);
brandRouter.delete("/brand/:id", authMiddleware, BrandController.delete);
brandRouter.get("/brands", BrandController.list);

export default brandRouter;

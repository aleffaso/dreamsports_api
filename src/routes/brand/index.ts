import { Router } from "express";
import BrandController from "../../controllers/brands/BrandController";
import userAuthMiddleware from "../../middlewares/userAuthMiddleware";

const brandRouter = Router();

brandRouter.post("/brand", userAuthMiddleware, BrandController.create);
brandRouter.put("/brand/:id", userAuthMiddleware, BrandController.update);
brandRouter.get("/brand/:id", BrandController.get);
brandRouter.delete("/brand/:id", userAuthMiddleware, BrandController.delete);
brandRouter.get("/brands", BrandController.list);

export default brandRouter;

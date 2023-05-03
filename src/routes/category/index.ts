import { Router } from "express";
import CategoryController from "../../controllers/categories/CategoryController";
import userAuthMiddleware from "../../middlewares/userAuthMiddleware";

const categoryRouter = Router();

categoryRouter.post("/category", userAuthMiddleware, CategoryController.create);
categoryRouter.put(
  "/category/:id",
  userAuthMiddleware,
  CategoryController.update
);
categoryRouter.get("/category/:id", CategoryController.get);
categoryRouter.delete(
  "/category/:id",
  userAuthMiddleware,
  CategoryController.delete
);
categoryRouter.get("/categories", CategoryController.list);

export default categoryRouter;

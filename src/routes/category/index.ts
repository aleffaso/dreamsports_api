import { Router } from "express";
import CategoryController from "../../controllers/categories/CategoryController";
import authMiddleware from "../../middlewares/authMiddleware";

const categoryRouter = Router();

categoryRouter.post("/category", authMiddleware, CategoryController.create);
categoryRouter.put("/category/:id", authMiddleware, CategoryController.update);
categoryRouter.get("/category/:id", CategoryController.get);
categoryRouter.delete(
  "/category/:id",
  authMiddleware,
  CategoryController.delete
);
categoryRouter.get("/categories", CategoryController.list);

export default categoryRouter;

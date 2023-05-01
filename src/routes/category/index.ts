import { Router } from "express";
import CategoryController from "../../controllers/categories/CategoryController";

const categoryRouter = Router();

categoryRouter.post("/category", CategoryController.create);

export default categoryRouter;

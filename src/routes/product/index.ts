import { Router } from "express";
import ProductsController from "../../controllers/products/ProductsController";

const productRouter = Router();

productRouter.post("/product", ProductsController.create);
productRouter.get("/products", ProductsController.list);

export default productRouter;

import { Router } from "express";
import ProductController from "../../controllers/products/ProductController";
import userAuthMiddleware from "../../middlewares/userAuthMiddleware";

const productRouter = Router();

productRouter.post("/product", userAuthMiddleware, ProductController.create);
productRouter.put(
  "/category/:id",
  userAuthMiddleware,
  ProductController.update
);
productRouter.get("/category/:id", ProductController.get);
productRouter.delete(
  "/category/:id",
  userAuthMiddleware,
  ProductController.delete
);
productRouter.get("/products", ProductController.list);

export default productRouter;

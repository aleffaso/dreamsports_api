import { Router } from "express";
import ProductController from "../../controllers/products/ProductController";
import userAuthMiddleware from "../../middlewares/userAuthMiddleware";

const productRouter = Router();

productRouter.post("/product", userAuthMiddleware, ProductController.create);
productRouter.put("/product/:id", userAuthMiddleware, ProductController.update);
productRouter.get("/product/:id", ProductController.get);
productRouter.delete(
  "/product/:id",
  userAuthMiddleware,
  ProductController.delete
);
productRouter.get("/products", ProductController.list);

export default productRouter;

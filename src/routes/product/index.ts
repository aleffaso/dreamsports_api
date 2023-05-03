import { Router } from "express";
import ProductController from "../../controllers/products/ProductController";
import authMiddleware from "../../middlewares/authMiddleware";

const productRouter = Router();

productRouter.post("/product", authMiddleware, ProductController.create);
productRouter.put("/category/:id", authMiddleware, ProductController.update);
productRouter.get("/category/:id", ProductController.get);
productRouter.delete("/category/:id", authMiddleware, ProductController.delete);
productRouter.get("/products", ProductController.list);

export default productRouter;

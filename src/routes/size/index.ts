import { Router } from "express";
import SizeController from "../../controllers/sizes/SizeController";
import userAuthMiddleware from "../../middlewares/userAuthMiddleware";

const sizeRouter = Router();

sizeRouter.post("/size", userAuthMiddleware, SizeController.create);
sizeRouter.put("/size/:id", userAuthMiddleware, SizeController.update);
sizeRouter.get("/size/:id", SizeController.get);
sizeRouter.delete("/size/:id", userAuthMiddleware, SizeController.delete);
sizeRouter.get("/sizes", SizeController.list);

export default sizeRouter;

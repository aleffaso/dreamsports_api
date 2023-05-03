import { Router } from "express";
import SizeController from "../../controllers/sizes/SizeController";
import authMiddleware from "../../middlewares/authMiddleware";

const sizeRouter = Router();

sizeRouter.post("/size", authMiddleware, SizeController.create);
sizeRouter.put("/size/:id", authMiddleware, SizeController.update);
sizeRouter.get("/size/:id", SizeController.get);
sizeRouter.delete("/size/:id", authMiddleware, SizeController.delete);
sizeRouter.get("/sizes", SizeController.list);

export default sizeRouter;

import { Router } from "express";
import UserController from "../../controllers/users/UserController";
import authMiddleware from "../../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/user/authenticate", UserController.authenticate);
userRouter.post("/user", authMiddleware, UserController.create);
userRouter.put("/user/:id", authMiddleware, UserController.update);
userRouter.get("/user/:id", authMiddleware, UserController.get);
userRouter.delete("/user/:id", authMiddleware, UserController.delete);
userRouter.get("/users", authMiddleware, UserController.list);

export default userRouter;

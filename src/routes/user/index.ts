import { Router } from "express";
import UserController from "../../controllers/users/UserController";
import userAuthMiddleware from "../../middlewares/userAuthMiddleware";

const userRouter = Router();

userRouter.post("/user/authenticate", UserController.authenticate);
userRouter.post("/user/refresh-token", UserController.refreshToken);
userRouter.post("/user", userAuthMiddleware, UserController.create);
userRouter.put("/user/:id", userAuthMiddleware, UserController.update);
userRouter.get("/user/:id", userAuthMiddleware, UserController.get);
userRouter.delete("/user/:id", userAuthMiddleware, UserController.delete);
userRouter.get("/users", userAuthMiddleware, UserController.list);

export default userRouter;

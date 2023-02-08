import { Router } from "express";

import authMiddleware from "./middlewares/authMiddleware";

import UserController from "./controllers/users/UserController";

const router = Router();

router.post("/user/authenticate", UserController.authenticate);
router.post("/user/create", authMiddleware, UserController.create);
router.put("/user/:id", authMiddleware, UserController.update);
router.get("/user/:id", authMiddleware, UserController.get);
router.delete("/user/:id", authMiddleware, UserController.delete);
router.get("/users", authMiddleware, UserController.list);

export default router;

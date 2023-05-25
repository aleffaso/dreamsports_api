import { Router } from "express";
import CustomerController from "../../controllers/customers/CustomerController";
import CustomerAuthMiddleware from "../../middlewares/customerAuthMiddleware";
import UserAuthMiddleware from "../../middlewares/userAuthMiddleware";

const customerRouter = Router();

customerRouter.post("/customer/authenticate", CustomerController.authenticate);
customerRouter.post("/customer", CustomerController.create);
customerRouter.put(
  "/customer/:id",
  CustomerAuthMiddleware,
  CustomerController.update
);
customerRouter.get(
  "/customer/:id",
  CustomerAuthMiddleware,
  CustomerController.get
);
customerRouter.delete(
  "/customer/:id",
  CustomerAuthMiddleware,
  CustomerController.delete
);
customerRouter.get("/customers", UserAuthMiddleware, CustomerController.list);

export default customerRouter;

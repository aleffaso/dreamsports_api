import { Router } from "express";
import CustomerController from "../../controllers/customers/CustomerController";
import CustomerAuthMiddleware from "../../middlewares/customerAuthMiddleware";
import UserAuthMiddleware from "../../middlewares/userAuthMiddleware";

const CustomerRouter = Router();

CustomerRouter.post("/customer/authenticate", CustomerController.authenticate);
CustomerRouter.post("/customer", CustomerController.create);
CustomerRouter.put(
  "/customer/:id",
  CustomerAuthMiddleware,
  CustomerController.update
);
CustomerRouter.get(
  "/customer/:id",
  CustomerAuthMiddleware,
  CustomerController.get
);
CustomerRouter.delete(
  "/customer/:id",
  CustomerAuthMiddleware,
  CustomerController.delete
);
CustomerRouter.get("/customers", UserAuthMiddleware, CustomerController.list);

export default CustomerRouter;

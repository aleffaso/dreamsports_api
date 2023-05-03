import { Router } from "express";
import CustomerController from "../../controllers/customers/CustomerController";
import CustomerAuthMiddleware from "../../middlewares/customerAuthMiddleware";
import UserAuthMiddleware from "../../middlewares/userAuthMiddleware";

const CustomerRouter = Router();

CustomerRouter.post("/Customer/authenticate", CustomerController.authenticate);
CustomerRouter.post("/Customer", CustomerController.create);
CustomerRouter.put(
  "/Customer/:id",
  CustomerAuthMiddleware,
  CustomerController.update
);
CustomerRouter.get(
  "/Customer/:id",
  CustomerAuthMiddleware,
  CustomerController.get
);
CustomerRouter.delete(
  "/Customer/:id",
  CustomerAuthMiddleware,
  CustomerController.delete
);
CustomerRouter.get("/Customers", UserAuthMiddleware, CustomerController.list);

export default CustomerRouter;

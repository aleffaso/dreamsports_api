import { Request, Response } from "express";

import { ListCustomersService } from "../../service/customers/ListCustomersService";
import { GetCustomerService } from "../../service/customers/GetCustomerService";
import { CreateCustomerService } from "../../service/customers/CreateCustomerService";
import { UpdateCustomerService } from "../../service/customers/UpdateCustomerService";
import { DeleteCustomerService } from "../../service/customers/DeleteCustomerService";
import { AuthenticateCustomerService } from "../../service/customers/AuthenticateCustomerService";

export default new (class CustomerController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const authenticateCustomerService = new AuthenticateCustomerService();

      const authenticate = await authenticateCustomerService.execute({
        email,
        password,
      });

      return res.json(authenticate);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async create(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      zipCode,
      streetAddress,
      numberAddress,
      referenceAddress,
      city,
      state,
      country,
      password,
    } = req.body;
    try {
      const createCustomerService = new CreateCustomerService();

      const customerRequest = await createCustomerService.execute({
        firstName,
        lastName,
        phoneNumber,
        email,
        zipCode,
        streetAddress,
        numberAddress,
        referenceAddress,
        city,
        state,
        country,
        password,
      });

      return res.json(customerRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const listCustomersService = new ListCustomersService();

      const customers = await listCustomersService.execute();

      return res.json(customers);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const getCustomerService = new GetCustomerService();

      const customer = await getCustomerService.execute({ id });

      return res.json(customer);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      zipCode,
      streetAddress,
      numberAddress,
      referenceAddress,
      city,
      state,
      country,
      password,
    } = req.body;
    try {
      const updateCustomerService = new UpdateCustomerService();

      const customerRequest = await updateCustomerService.execute({
        id,
        firstName,
        lastName,
        phoneNumber,
        email,
        zipCode,
        streetAddress,
        numberAddress,
        referenceAddress,
        city,
        state,
        country,
        password,
      });

      return res.json(customerRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleteCustomerService = new DeleteCustomerService();

      await deleteCustomerService.execute({
        id,
      });

      return res.status(200).json({
        message: "Deleted successfully",
      });
    } catch (error) {
      res.json({ error: error });
    }
  }
})();

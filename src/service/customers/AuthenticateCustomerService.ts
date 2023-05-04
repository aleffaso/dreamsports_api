import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../data-source";
import { Customer as CustomerTable } from "../../entities/Customer";
import { CustomerRequest, CustomerResponse } from "./types";
import { KEYS } from "../../constants";

class AuthenticateCustomerService {
  async execute({ email, password }: CustomerRequest) {
    const customerRepo = AppDataSource.getRepository(CustomerTable);
    const customer = await customerRepo.findOne({ where: { email } });

    if (!customer) {
      throw new DoesNotExistError("E-mail does not exist");
    }

    const isValidPassword = await bcrypt.compare(
      password as string,
      customer.password
    );

    if (!isValidPassword) {
      throw new DoesNotExistError("Password does not match");
    }

    const token = jwt.sign({ id: customer.id }, KEYS.JWT.CUSTOMER, {
      expiresIn: "1d",
    });

    const customerResponse: CustomerResponse = {
      id: customer.id,
      fullName: customer.fullName,
      email: email,
    };

    return { Customer: customerResponse, token };
  }
}

export { AuthenticateCustomerService };

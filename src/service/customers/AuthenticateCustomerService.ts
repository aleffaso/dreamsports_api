import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../data-source";
import { Customer as CustomerTable } from "../../entities/Customer";
import { CustomerRequest, CustomerResponse } from "./types";
import { KEYS } from "../../constants";
import { DoesNotExistError } from "../../errors";

class AuthenticateCustomerService {
  async execute({ email, password }: CustomerRequest) {
    try {
      const customerRepo = AppDataSource.getRepository(CustomerTable);
      const customer = await customerRepo.findOne({ where: { email } });

      if (!customer) {
        throw new DoesNotExistError("Data does not match");
      }

      const isValidPassword = await bcrypt.compare(
        password as string,
        customer.password
      );

      if (!isValidPassword) {
        throw new DoesNotExistError("Data does not match");
      }

      const customerResponse: CustomerResponse = {
        id: customer.id,
        fullName: customer.fullName,
        email: email,
      };

      const token = jwt.sign({ id: customer.id }, KEYS.JWT.CUSTOMER, {
        expiresIn: KEYS.JWT.USER_TOKEN_KEY,
      });

      return {
        Customer: customerResponse,
        token,
      };
    } catch (error) {
      if (error instanceof DoesNotExistError) {
        return {
          message: error.name,
          status_code: error.status(),
        };
      }
    }
  }
}

export { AuthenticateCustomerService };

import { AppDataSource } from "../../data-source";

import { Customer as CustomerTable } from "../../entities/Customer";
import { DoesNotExistError } from "../../errors";
import { CustomerId, CustomerResponse } from "./types";

export class GetCustomerService {
  async execute({ id }: CustomerId) {
    const customerRepo = AppDataSource.getRepository(CustomerTable);

    const customer = await customerRepo.findOne({ where: { id } });

    if (!customer) {
      throw new DoesNotExistError("Customer does not exist");
    }

    const customerResponse: CustomerResponse = {
      id: id,
      email: customer.email,
      fullName: `${customer.firstName} ${customer.lastName}`,
      phoneNumber: customer.phoneNumber,
      zipCode: customer.zipCode,
      streetAddress: customer.streetAddress,
      numberAddress: customer.numberAddress,
      referenceAddress: customer.referenceAddress,
      city: customer.city,
      state: customer.state,
      country: customer.country,
    };

    return { Customer: customerResponse };
  }
}

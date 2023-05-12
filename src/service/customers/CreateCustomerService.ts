import bcrypt from "bcryptjs";

import { AppDataSource } from "../../data-source";
import { Customer as CustomerTable } from "../../entities/Customer";
import { CustomerCreate, CustomerResponse } from "./types";
import { AlreadyExistsError } from "../../errors";

export class CreateCustomerService {
  async execute({
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
  }: CustomerCreate) {
    const customerRepo = AppDataSource.getRepository(CustomerTable);
    const customerAlreadyExists = await customerRepo.findOne({
      where: { email },
    });

    if (customerAlreadyExists) {
      throw new AlreadyExistsError("Customer already exists");
    }

    const customer = customerRepo.create({
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
      password: bcrypt.hashSync(password as string, 8),
    });

    await customerRepo.save(customer);

    const customerResponse: CustomerResponse = {
      id: customer.id,
      fullName: `${firstName} ${lastName}`,
      email: email,
      phoneNumber: phoneNumber,
      zipCode: zipCode,
      streetAddress: streetAddress,
      numberAddress: numberAddress,
      referenceAddress: referenceAddress,
      city: city,
      state: state,
      country: country,
    };

    return { Customer: customerResponse };
  }
}

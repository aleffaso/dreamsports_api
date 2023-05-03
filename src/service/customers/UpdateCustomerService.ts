import bcrypt from "bcryptjs";

import { AppDataSource } from "../../data-source";
import { Customer as CustomerTable } from "../../entities/Customer";
import { CustomerUpdate, CustomerResponse } from "./types";

export class UpdateCustomerService {
  async execute({
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
  }: CustomerUpdate) {
    const customerRepo = AppDataSource.getRepository(CustomerTable);
    const customer = await customerRepo.findOne({ where: { id } });

    if (!customer) {
      throw new DoesNotExistError("Customer does not exist");
    }

    customerRepo.update(id as string, {
      firstName: firstName,
      lastName: lastName,
      fullName: firstName + " " + lastName,
      phoneNumber: phoneNumber,
      email: email,
      zipCode: zipCode,
      streetAddress: streetAddress,
      numberAddress: numberAddress,
      referenceAddress: referenceAddress,
      city: city,
      state: state,
      country: country,
      password: bcrypt.hashSync(password as string, 8),
    });

    await customerRepo.save(customer);

    const customerResponse: CustomerResponse = {
      id: id,
      fullName: firstName + " " + lastName,
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

    return { customer: customerResponse };
  }
}

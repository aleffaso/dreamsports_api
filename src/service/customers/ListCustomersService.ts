import { AppDataSource } from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { Customer as CustomerTable } from "../../entities/Customer";

export class ListCustomersService {
  async execute() {
    const customerRepo = AppDataSource.getRepository(CustomerTable);

    const customers = await customerRepo.find();

    return instanceToPlain(customers);
  }
}

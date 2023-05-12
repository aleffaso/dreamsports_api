import { AppDataSource } from "../../data-source";
import { Customer as CustomerTable } from "../../entities/Customer";
import { DoesNotExistError } from "../../errors";
import { CustomerId } from "./types";

export class DeleteCustomerService {
  async execute({ id }: CustomerId) {
    const customerRepo = AppDataSource.getRepository(CustomerTable);
    const customerId = await customerRepo.findOne({ where: { id } });

    if (!customerId) {
      throw new DoesNotExistError("Customer does not exist");
    }

    return await customerRepo.delete({
      id,
    });
  }
}

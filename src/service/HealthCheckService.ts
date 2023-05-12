import { AppDataSource } from "../data-source";
import { ServiceUnavailableError } from "../errors";

export class HealthCheckService {
  async execute() {
    const repo = AppDataSource.isInitialized;

    if (!repo) {
      throw new ServiceUnavailableError("Service Unavailable");
    }

    return { status: 200, message: "Ok" };
  }
}

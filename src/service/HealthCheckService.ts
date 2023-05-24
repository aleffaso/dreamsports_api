import { AppDataSource } from "../data-source";
import { ServiceUnavailableError } from "../errors";

export class HealthCheckService {
  async execute() {
    try {
      const repo = AppDataSource.isInitialized;

      if (!repo) {
        throw new ServiceUnavailableError("Service Unavailable");
      }

      return { message: "Ok", status_code: 200 };
    } catch (error) {
      if (error instanceof ServiceUnavailableError) {
        return {
          message: error.name,
          status_code: error.status(),
        };
      }
    }
  }
}

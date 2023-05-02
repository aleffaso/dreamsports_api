import { AppDataSource } from "../data-source";

export class HealthCheckService {
  async execute() {
    const repo = AppDataSource.isInitialized;

    if (!repo) {
      throw {
        status: 503,
        message: "Service Unavailable",
      };
    }

    return { status: 200, message: "Ok" };
  }
}
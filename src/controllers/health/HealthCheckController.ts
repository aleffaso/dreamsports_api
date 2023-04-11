import { Request, Response } from "express";
import { HealthCheckService } from "../../service/HealthCheckService";

class HealthCheckController {
  async healthCheck(req: Request, res: Response) {
    try {
      const healthCheckService = new HealthCheckService();

      const healthCheck = await healthCheckService.execute();

      return res.json(healthCheck);
    } catch (error) {
      res.json({ error: error });
    }
  }
}

export default new HealthCheckController();

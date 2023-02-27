import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.ORM_CONFIG_HOST,
  port: process.env.ORM_CONFIG_PORT as number | undefined,
  username: process.env.ORM_CONFIG_USERNAME,
  password: process.env.ORM_CONFIG_PASSWORD,
  database: process.env.ORM_CONFIG_DB,
  logging: false,
  synchronize: false,
  entities: [`${__dirname}/entities/*.{ts,js}`],
  migrations: [`${__dirname}/database/migrations/*.{ts,js}`],
});

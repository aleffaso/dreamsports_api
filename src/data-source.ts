import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const port = process.env.ORMCONFIG_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.ORMCONFIG_HOST,
  port: port,
  username: process.env.ORMCONFIG_USERNAME,
  password: process.env.ORMCONFIG_PASSWORD,
  database: process.env.ORMCONFIG_DB,
  logging: false,
  synchronize: false,
  entities: [`${__dirname}/entities/*.{ts,js}`],
  migrations: [`${__dirname}/database/migrations/*.{ts,js}`],
});

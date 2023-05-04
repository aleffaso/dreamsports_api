import "reflect-metadata";
import { DataSource } from "typeorm";
import { KEYS } from "./constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: KEYS.ORM_CONFIG.HOST,
  port: KEYS.ORM_CONFIG.PORT,
  username: KEYS.ORM_CONFIG.USERNAME,
  password: KEYS.ORM_CONFIG.PASSWORD,
  database: KEYS.ORM_CONFIG.DB,
  logging: false,
  synchronize: false,
  entities: [`${__dirname}/entities/*.{ts,js}`],
  migrations: [`${__dirname}/database/migrations/*.{ts,js}`],
});

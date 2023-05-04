import "dotenv/config";
export const KEYS = {
  POSTGRES: {
    NAME: (process.env.POSTGRES_NAME as string) ?? "",
    NEW_NAME: (process.env.NEW_POSTGRES_NAME as string) ?? "",
    PASSWORD: (process.env.POSTGRES_PASSWORD as string) ?? "",
    USER: (process.env.POSTGRES_USER as string) ?? "",
    DB: (process.env.POSTGRES_DB as string) ?? "",
  },
  ORM_CONFIG: {
    DB: (process.env.ORM_CONFIG_DB as string) ?? "",
    USERNAME: (process.env.ORM_CONFIG_USERNAME as string) ?? "",
    PASSWORD: (process.env.ORM_CONFIG_PASSWORD as string) ?? "",
    HOST: (process.env.ORM_CONFIG_HOST as string) ?? "",
    PORT: Number(process.env.ORM_CONFIG_PORT as string) ?? undefined,
  },
  PORT: Number(process.env.PORT as string) ?? undefined,
  JWT: {
    USER: (process.env.JWT_USER as string) ?? "",
    CUSTOMER: (process.env.JWT_CUSTOMER as string) ?? "",
  },
};

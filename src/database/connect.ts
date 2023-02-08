import { AppDataSource } from "../data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })
  .catch((err) => {
    console.log("Error during Data Source initialization: ", err);
  });

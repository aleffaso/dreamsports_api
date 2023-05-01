import "reflect-metadata";
import express from "express";
import "dotenv/config";

import "./database/connect";
import routes from "./routes";
import userRouter from "./routes/user";
import categoryRouter from "./routes/category";

const app = express();

app.use(express.json());
app.use(routes);
app.use(userRouter);
app.use(categoryRouter);

app.listen(process.env.PORT, () =>
  console.log("server started at http://localhost:" + process.env.PORT)
);

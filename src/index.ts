import "reflect-metadata";
import express from "express";
import "dotenv/config";

import "./database/connect";
import routes from "./routes";
import userRouter from "./routes/user";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
import brandRouter from "./routes/brand";
import colorRouter from "./routes/color";
import sizeRouter from "./routes/size";
import imageRouter from "./routes/image";
import CustomerRouter from "./routes/customer";
import { KEYS } from "./constants";

const app = express();

app.use(express.json());
app.use(routes);
app.use(brandRouter);
app.use(categoryRouter);
app.use(colorRouter);
app.use(imageRouter);
app.use(productRouter);
app.use(sizeRouter);
app.use(userRouter);
app.use(CustomerRouter);

app.listen(KEYS.PORT, () =>
  console.log(`server started at http://localhost:${KEYS.PORT}`)
);

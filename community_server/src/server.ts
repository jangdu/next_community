import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

import dotenv from "dotenv";

const app = express();

app.use(express.json());
const origin = process.env.ORIGIN;

// dev, short, common, combined
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("running server"));

let port = 4000;

app.listen(port, async () => {
  console.log(`server running at ${process.env.APP_URL}`);

  AppDataSource.initialize()
    .then(async () => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});

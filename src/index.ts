import { initServer2 } from "./app";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

export async function init() {
  const server = await initServer2();
  const app = express();
  app.use(express.json());
  app.use(cors());
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => {
    console.log(`Server running on Port: ${8000}`);
  });
}

init();

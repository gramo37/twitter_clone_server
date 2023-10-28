import { initServer } from "./app";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

export async function init() {
  const server = await initServer();
  const app = express();
  app.use(express.json());
  app.use(cors());
  await server.start();
  app.use("/graphql", expressMiddleware(server, {
    context: async ({ req, res }) => ({
      auth: req.headers.authorization,
    }),
  }));
  app.listen(8000, () => {
    console.log(`Server running on Port: ${8000}`);
  });
}

init();

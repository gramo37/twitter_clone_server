import { ApolloServer } from "@apollo/server";
import { queries, types, resolvers } from "./User";

export async function initServer() {
  const typeDefs = `
  ${types}
  type Query {
    ${queries}
  }`;
  const rs = {
    Query: {
      ...resolvers.queries,
    },
  };
  console.log("typeDefs", typeDefs);
  console.log("resolvers", rs);
  const server = new ApolloServer({
    typeDefs,
    resolvers: rs,
  });

  return server;
}

export async function initServer2() {
  const typeDefs = `
  ${types}
  type Query {
    ${queries}
  }`;
  const rs = {
    Query: {
      ...resolvers.queries,
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers: rs,
  });

  return server;
}

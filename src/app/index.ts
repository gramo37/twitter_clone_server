import { ApolloServer } from "@apollo/server";
import { User } from "./User";
import { Tweet } from "./Tweet";

export async function initServer() {
  const typeDefs = `
  ${User.types}
  ${Tweet.types}
  type Query {
    ${User.queries}
    ${Tweet.queries}
  }
  
  type Mutation {
    ${Tweet.mutations}
  }
  `;
  const rs = {
    Query: {
      ...User.resolvers.queries,
      ...Tweet.resolvers.queries
    },
    Mutation: {
      ...Tweet.resolvers.mutations,
    },
    ...Tweet.resolvers.extraResolvers,
    ...User.resolvers.extraResolvers
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers: rs,
  });

  return server;
}

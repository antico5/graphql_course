import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "Hi there!";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is running");
});

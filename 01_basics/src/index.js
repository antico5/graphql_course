import { GraphQLServer } from "graphql-yoga";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

import db from "./db";

const resolvers = {
  Query,
  Post,
  User,
  Comment,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
  },
});

server.start(() => {
  console.log("Server is running");
});

export default {};

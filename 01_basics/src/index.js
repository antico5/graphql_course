import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    greeting(name: String): String!
    add(a: Float!, b: Float!): Float!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: 123,
        name: "Armando",
        email: "armando.andini@gmail.com",
        age: 29,
      };
    },

    post() {
      return {
        id: "P1234",
        title: "Wow",
        body: "such post",
        published: true,
      };
    },

    greeting(parent, args, ctx, info) {
      // console.log("parent", JSON.stringify(parent, null, 2));
      // console.log("args", JSON.stringify(args, null, 2));
      // console.log("ctx", JSON.stringify(ctx, null, 2));
      // console.log("info", JSON.stringify(info, null, 2));
      return `Hello`;
    },

    add(_, { a, b }) {
      return a + b;
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

import { GraphQLServer } from "graphql-yoga";

const userList = [
  {
    id: 1,
    name: "Armando",
    age: 29,
  },
  {
    id: 2,
    name: "John",
    age: 31,
  },
];

const postList = [
  {
    id: 1,
    title: "Title 1",
    body: "Whatever",
    published: true,
  },
  {
    id: 2,
    title: "Really amazing post",
    body: "Wow",
    published: true,
  },
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
  }

  type User {
    id: ID!
    name: String!
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

    users(parent, { query }, ctx, info) {
      return query
        ? userList.filter((user) => user.name.includes(query))
        : userList;
    },

    posts(parent, { query }, ctx, info) {
      return query
        ? postList.filter(
            (post) => post.title.includes(query) || post.body.includes(query)
          )
        : postList;
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

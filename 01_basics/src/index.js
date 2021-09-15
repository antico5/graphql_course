import { GraphQLServer } from "graphql-yoga";
import { v4 as uuid } from "uuid";

const userList = [
  {
    id: "1",
    name: "Armando",
    age: 29,
  },
  {
    id: "2",
    name: "John",
    age: 31,
  },
];

const postList = [
  {
    id: "1",
    title: "Title 1",
    body: "Whatever",
    published: true,
    authorId: "1",
  },
  {
    id: "2",
    title: "Really amazing post",
    body: "Wow",
    published: true,
    authorId: "2",
  },
];

const commentList = [
  {
    id: "1",
    text: "Nice post",
    postId: "1",
    authorId: "2",
  },
  {
    id: "2",
    text: "Thanks!",
    postId: "2",
    authorId: "1",
  },
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(data: CreatePostInput): Post!
    deleteUser(id: ID!): User!
  }

  input CreateUserInput {
    name: String!
    age: Int!
  }

  input CreatePostInput {
    title: String!
    body: String!
    authorId: ID!
    published: Boolean!
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const Query = {
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

  comments() {
    return commentList;
  },
};

const Mutation = {
  createUser(parent, { data }, ctx, info) {
    if (userList.find((u) => u.name == data.name)) {
      throw new Error("User name is already taken");
    }
    const user = {
      id: uuid(),
      ...data,
    };
    userList.push(user);
    return user;
  },

  createPost(parent, { data }, ctx, info) {
    if (!userList.some((u) => u.id == data.authorId)) {
      throw new Error("User id not found");
    }

    const post = {
      id: uuid(),
      ...data,
    };

    postList.push(post);
    return post;
  },

  deleteUser(parent, { id }, ctx, info) {
    const index = userList.findIndex((u) => u.id === id);

    if (index == -1) {
      throw new Error("User not found");
    }

    const user = userList[index];

    userList.splice(index, 1);

    return user;
  },
};

const Post = {
  author(parent, args, ctx, info) {
    return userList.find((user) => user.id === parent.authorId);
  },

  comments(parent, args, ctx, info) {
    return commentList.filter((comment) => comment.postId == parent.id);
  },
};

const User = {
  posts(parent, args, ctx, info) {
    return postList.filter((post) => post.authorId == parent.id);
  },

  comments(parent, args, ctx, info) {
    return commentList.filter((comment) => comment.authorId == parent.id);
  },
};

const Comment = {
  author(parent, args, ctx, info) {
    return userList.find((user) => user.id === parent.authorId);
  },

  post(parent, args, ctx, info) {
    return postList.find((post) => post.id === parent.postId);
  },
};

const resolvers = {
  Query,
  Post,
  User,
  Comment,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is running");
});

export default {};

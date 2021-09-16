import { v4 as uuid } from "uuid";
export default {
  createUser(parent, { data }, { db }, info) {
    if (db.users.find((u) => u.name == data.name)) {
      throw new Error("User name is already taken");
    }
    const user = {
      id: uuid(),
      ...data,
    };
    db.users.push(user);
    return user;
  },

  createPost(parent, { data }, { db, pubsub }, info) {
    if (!db.users.some((u) => u.id == data.authorId)) {
      throw new Error("User id not found");
    }

    const post = {
      id: uuid(),
      ...data,
    };

    db.posts.push(post);

    pubsub.publish(`posts`, {
      posts: {
        mutation: "create",
        data: post,
      },
    });

    return post;
  },

  deletePost(parent, { id }, { db, pubsub }, info) {
    const index = db.posts.findIndex((u) => u.id === id);

    if (index == -1) {
      throw new Error("post not found");
    }

    const post = db.posts[index];

    db.posts.splice(index, 1);

    pubsub.publish(`posts`, {
      posts: {
        mutation: "delete",
        data: post,
      },
    });

    return post;
  },

  createComment(parent, { data }, { db, pubsub }, info) {
    if (!db.users.some((u) => u.id == data.authorId)) {
      throw new Error("User id not found");
    }

    if (!db.posts.some((p) => p.id == data.postId)) {
      throw new Error("Post id not found");
    }

    const comment = {
      id: uuid(),
      ...data,
    };

    db.comments.push(comment);

    pubsub.publish(`postComments_${data.postId}`, { comments: comment });

    return comment;
  },

  deleteUser(parent, { id }, { db }, info) {
    const index = db.users.findIndex((u) => u.id === id);

    if (index == -1) {
      throw new Error("User not found");
    }

    const user = db.users[index];

    db.users.splice(index, 1);

    return user;
  },

  updateUser(parent, { id, data }, { db }, info) {
    const user = db.users.find((u) => u.id == id);

    if (!user) {
      throw new Error("User not found");
    }

    Object.assign(user, data);

    return user;
  },
};

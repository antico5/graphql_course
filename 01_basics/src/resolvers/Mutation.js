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

  createPost(parent, { data }, { db }, info) {
    if (!db.users.some((u) => u.id == data.authorId)) {
      throw new Error("User id not found");
    }

    const post = {
      id: uuid(),
      ...data,
    };

    db.posts.push(post);
    return post;
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

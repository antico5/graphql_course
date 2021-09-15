export default {
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

  users(parent, { query }, { db }, info) {
    return query
      ? db.users.filter((user) => user.name.includes(query))
      : db.users;
  },

  posts(parent, { query }, { db }, info) {
    return query
      ? db.posts.filter(
          (post) => post.title.includes(query) || post.body.includes(query)
        )
      : db.posts;
  },

  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

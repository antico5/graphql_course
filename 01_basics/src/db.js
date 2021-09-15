export const users = [
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

export const posts = [
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

export const comments = [
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

export default {
  users,
  comments,
  posts,
};

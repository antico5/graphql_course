export default {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      const channel = "count";
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish(channel, {
          count,
        });
      }, 1000);

      return pubsub.asyncIterator(channel);
    },
  },

  comments: {
    subscribe(parent, { postId }, { pubsub, db }, info) {
      const post = db.posts.find((p) => p.id == postId);

      if (!post) {
        throw new Error("Post not found");
      }

      const channel = `postComments_${postId}`;

      return pubsub.asyncIterator(channel);
    },
  },
};

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: String,
  },

  title: {
    required: [true, "title of post is required"],
    type: String,
    minlength: [5, "title should be at least 5 characters long"],
  },
  tag: {
    type: String,
    required: [true, "tag of post is required"],
  },
  description: {
    type: String,
    required: [true, "description of post is required"],
    minlength: [10, "description should be at least 10 characters long"],
  },
  answers: [
    {
      answer: {
        type: String,
        required: [true, "answer to the post is compulsory"],
        minlength: [10, "answer should be at least 10 characters long"],
      },
      author: {
        type: String,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

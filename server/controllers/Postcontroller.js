const Post = require("../models/Post");
const { post } = require("../routes/Postroutes");

const handleError = (err) => {
  const errors = { title: "", tag: "", description: "", answer: "" };
  //Post Validation Error
  if (err.message.includes("Post validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // Answer Validation Error
  if (err.message == "Invalid Answer") {
    errors.answer = "Answer must be at least 10 character long";
  }

  return errors;
};

module.exports.compose_post_method = async (req, res) => {
  const { author, title, tag, description } = req.body;

  try {
    const post = await Post.create({ author, title, tag, description });
    res.status(200).json({ post: post._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.answer_post_method = async (req, res) => {
  const { author, answer, postId } = req.body;

  try {
    if (answer.length < 10) {
      throw Error("Invalid Answer");
    }

    const post = await Post.findByIdAndUpdate(postId, {
      $push: {
        answers: { answer, author },
      },
    });

    // post.answers = [...post.answers, { answer, author }];
    // console.log({ post });

    res.status(200).json({ post });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.get_academic_method = async (req, res) => {
  try {
    const academicPosts = await Post.find({ tag: "Academics" });
    res.status(200).json({ academicPosts });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.get_club_method = async (req, res) => {
  try {
    const clubPosts = await Post.find({ tag: "Club" });
    res.status(200).json({ clubPosts });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.get_cocurricular_method = async (req, res) => {
  try {
    const CocurricularPosts = await Post.find({ tag: "Co-Curricular" });
    res.status(200).json({ CocurricularPosts });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.get_all_post_get_method = async (req, res) => {
  try {
    const Posts = await Post.find();
    res.status(200).json({ Posts });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.get_answer_get_method = async (req, res) => {
  const Id = req.params.id;

  try {
    const post = await Post.findById(Id);
    res.status(200).json({ post });
  } catch (err) {
    res.status(400).json({ err });
  }
};

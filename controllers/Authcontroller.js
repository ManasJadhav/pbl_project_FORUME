const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { checkUser } = require("../middleware/authMiddleware");

const handleError = (err) => {
  const errors = { name: "", email: "", password: "", confirmPassword: "" };
  console.log(err.message);

  // Handle Login Error
  if (err.message === "Invalid Email") {
    errors.email = "Email is not registered";
  }

  if (err.message === "Invalid Password") {
    errors.password = "Password is not correct";
  }

  //Duplicate email error
  if (err.code === 11000) {
    errors.email = "Email already Registered";
    return errors;
  }
  //User Validation Errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  //Confirm password validation
  if (err.message == "Password must match") {
    errors.confirmPassword = "Password must match with the above field";
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return (token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  }));
};
module.exports.signup_post = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const user = await User.create({ name, email, password, confirmPassword });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res
    .clearCookie("jwt")
    .status(204)
    .json({ message: "Logged out successfully" });
};

module.exports.getUser_get = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

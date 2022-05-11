const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        throw Error("User is not logged-in");
      } else {
        next();
      }
    });
  } else {
    throw Error("User is not logged-in");
  }
};

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "User is Not authenticated" });
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ error: "User is Not authenticated" });
        }
      }
    });
  } else {
    res.status(401).json({ error: "User is Not authenticated" });
  }
};

module.exports = { requireAuth, checkUser };

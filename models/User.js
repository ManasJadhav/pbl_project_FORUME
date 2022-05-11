const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    validate: [isEmail, "pls Enter a Valid Email"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is a required field"],
    minLength: [8, "Password must be at least 8 characters long"],
  },

  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is a required field"],
    minLength: [8, "Password must be at least 8 characters long"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
  if (this.password === this.confirmPassword) {
    next();
  } else {
    throw Error("Password must match");
  }
});

// userSchema.pre("save", async function (next) {
//   const check = await bcrypt.compare(this.password, this.confirmPassword);
//   if (check) {
//     next();
//   } else {
//     throw Error("password must match");
//   }
//   next();
// });

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Invalid Password");
  }
  throw Error("Invalid Email");
};

const User = mongoose.model("User", userSchema);
module.exports = User;

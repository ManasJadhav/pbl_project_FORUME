const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/Authroutes");
const postRoutes = require("./routes/Postroutes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();

dotenv.config({ path: "config.env" });

//middleware

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.get("*", checkUser);
app.post("/compose", checkUser);
app.post("/answer", checkUser);

const dbURI = process.env.DATABASE;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(5000);
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));
app.use(authRoutes);
app.use(postRoutes);

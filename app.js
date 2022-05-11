const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/Authroutes");
const postRoutes = require("./routes/Postroutes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "config.env" });

//middleware

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.DATABASE;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(PORT);
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));
app.use(authRoutes);
app.use(postRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

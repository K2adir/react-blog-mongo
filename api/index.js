require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 4500;
const { default: mongoose } = require("mongoose");
// npm packs
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
//
//models
const User = require("./models/User");
const Post = require("./models/Post");
const { create } = require("./models/User");
//
const fs = require("fs");
const { title } = require("process");
const { request } = require("http");
////
// auth
var salt = bcrypt.genSaltSync(10);
const secret = process.env.JTW_PASS;
////

app.use(
  cors({
    credentials: true,
    origin: [
      "https://mern-stuff-stuff-app.onrender.com",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());
// lets express use the uploads folder. without this, no images/cover will be displayed
app.use("/uploads", express.static("uploads"));
// version error handling thingy.
mongoose.set("strictQuery", true);
/// connection
mongoose
  .connect(process.env.DB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    res.status(400).json(e);
  });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

function checkJwtToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("No JWT token provided");
  }
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).json("Invalid JWT token");
    }
    req.jwtInfo = info;
    next();
  });
}

app.get("/profile", checkJwtToken, (req, res) => {
  res.json(req.jwtInfo);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.put(
  "/post",
  checkJwtToken,
  uploadMiddleware.single("file"),
  async (req, res) => {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }

    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor =
      JSON.stringify(postDoc.author) === JSON.stringify(req.jwtInfo.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  }
);

app.post(
  "/post",
  checkJwtToken,
  uploadMiddleware.single("file"),
  async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: req.jwtInfo.id,
    });
    res.json(postDoc);
  }
);

app.listen(PORT, () => {
  console.log("listen @", PORT);
});

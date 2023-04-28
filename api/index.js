require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = 4500;
const User = require("./models/User");
const { create } = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
////
var salt = bcrypt.genSaltSync(10);
const secret = process.env.JTW_PASS;
////

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

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
  //   res.json(userDoc);   CHECKS THE PAYLOAD
  const passCorrect = bcrypt.compareSync(password, userDoc.password);
  //   res.json(passCorrect); CHECKS PASS - TRUE / FALSE on Payload

  // if login is success, network/headers will display set-cookie
  if (passCorrect) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("check your username or pass");
  }
});

app.listen(PORT, () => {
  console.log("listen @", PORT);
});

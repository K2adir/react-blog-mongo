require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = 4500;
const User = require("./models/User");
const { create } = require("./models/User");
app.use(cors());
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
      password,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.listen(PORT, () => {
  console.log("listen @", PORT);
});

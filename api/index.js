const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4500;

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  res.json({ requestData: { username, password } });
});

app.listen(PORT, () => {
  console.log("listen @", PORT);
});

//  mongodb+srv://k2adir:ZNA8Yf96lJhMSkWx@react-blog.qvsrusy.mongodb.net/test

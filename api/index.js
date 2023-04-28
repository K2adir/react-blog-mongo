const express = require("express");

const app = express();
const PORT = 4500;

app.listen(PORT, () => {
  console.log("listen @", PORT);
});

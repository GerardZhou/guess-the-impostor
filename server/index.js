const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi from backend");
});

app.listen(8080, () => {
  console.log("server running");
});

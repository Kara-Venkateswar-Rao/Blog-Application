const express = require("express");
const cors = require("cors");
const blogRouter = require("./route/Blog-rout");

require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use("/api", (req, res) => {
  res.send("hello MERN");
});

app.listen(4000, () => console.log("app is running at port no 4000..."));

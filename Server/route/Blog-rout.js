const express = require("express");
const blogRouter = express.Router();

const {
  fetchListOfBlog,
  addNewBlog,
  editBlog,
  deleteBlog,
} = require("../controller/BlogController");

blogRouter.get("/", fetchListOfBlog);
blogRouter.post("/add", addNewBlog);
blogRouter.put("/edit/:id", editBlog);
blogRouter.delete("/delete/:id", deleteBlog);

module.exports = blogRouter;

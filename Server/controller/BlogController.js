const mongoose = require("mongoose");
const Blog = require("../model/Blog");
const { json } = require("express");

// reade / fetch list of blog
// create / add new blog
// edit / edit blog
// delete / remove blog

// reade / fetch list of blog
const fetchListOfBlog = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (error) {
    console.log(error);
  }

  if (!blogList) {
    return res.status(404).json({ massage: "no blog found" });
  }

  return res.status(200).json({ blogList });
};

// create / add new blog
const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blog({
    title,
    description,
    data: currentDate,
  });

  try {
    await newlyCreatedBlog.save();
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save(session);
    session.commitTransaction();
  } catch (error) {
    res.send(500).json({ massage: error });
  }

  return res.status(200).json({ newlyCreatedBlog });
};

// delete / remove blog
const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);

    if (!findCurrentBlog) {
      return res.status(404).json({ massage: "blog not found" });
    }

    return res.status(200).json({ massage: "deletion successfull" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ massage: "unable to delete! please try again" });
  }
};

// edit / edit blog
const editBlog = async (req, res) => {
  const id = req.params.id;

  const { title, description } = req.body;

  let currentBlogToEdit;

  try {
    currentBlogToEdit = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      json({ massage: "Somthing went wrong ! please try again later" });
  }

  if (!currentBlogToEdit) {
    return res.status(500).json({ massage: "unable to update" });
  }

  return res.status(200).json({ currentBlogToEdit });
};

module.exports = { fetchListOfBlog, addNewBlog, deleteBlog, editBlog };

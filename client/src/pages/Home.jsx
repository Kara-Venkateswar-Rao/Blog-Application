import React, { useContext, useEffect } from "react";
import { BlogContext } from "../context/Context";
import axios from "axios";
import classes from "./style.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const { loading, setLoading, blogList, setBlogList, formData } =
    useContext(BlogContext);

  async function fetchListOfBlogs() {
    setLoading(true);
    const response = await axios.get("http://localhost:4000/api/blogs");
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setLoading(false);
    } else {
      setLoading(false);
      setBlogList([]);
    }
  }

  async function handelDeleteBlog(currectId) {
    console.log(currectId);

    const response = await axios.delete(
      `http://localhost:4000/api/blogs/delete/${currectId}`
    );

    const result = await response.data;

    if (result?.massage) {
      fetchListOfBlogs();
    }
  }

  const navigate = useNavigate();

  async function handelEditBlog(currectBlogItem) {
    navigate("/addblog", { state: { currectBlogItem } });
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={classes.blog}>
      {loading ? (
        <h1>Loading Blogs! Please wait</h1>
      ) : (
        <div className={classes.blogwraper}>
          {blogList && blogList.length ? (
            blogList.map((item) => (
              <div key={item._id} className={classes.blogitemwraper}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className={classes.icons}>
                  <FaEdit size={20} onClick={() => handelEditBlog(item)} />
                  <FaTrash
                    size={20}
                    onClick={() => handelDeleteBlog(item._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>No Blogs Added</h1>
              <Link to={"/addblog"}>
                <button>Add Blog</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;

import React, { useContext, useEffect } from "react";
import classes from "./style.module.css";
import { BlogContext } from "../context/Context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function AddBlog() {
  const { formData, setFormData, isEdit, setIsEdit } = useContext(BlogContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSaveBlogToDataBase() {
    const response = isEdit
      ? await axios.put(
          `http://localhost:4000/api/blogs/edit/${location.state.currectBlogItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:4000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });

    const result = response.data;

    console.log(result);

    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { currectBlogItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: currectBlogItem.title,
        description: currectBlogItem.description,
      });
    }
  }, [location]);

  return (
    <div className={classes.wraper}>
      <h1>{isEdit ? "Edit The Blog" : "Add new Blog"}</h1>
      <div className={classes.fromWraper}>
        <input
          type="text"
          name="title"
          required
          min={10}
          max={50}
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          placeholder="Enter Blog Title..."
          id="title"
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="desctiption"
          minLength={50}
          maxLength={500}
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        ></textarea>

        <button onClick={handleSaveBlogToDataBase}>
          {isEdit ? "Edit The Blog" : "Add new Blog"}
        </button>
      </div>
    </div>
  );
}

export default AddBlog;

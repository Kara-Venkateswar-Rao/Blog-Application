import { createContext, useState } from "react";

export const BlogContext = createContext(null);

export default function BlogState({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <BlogContext.Provider
      value={{
        formData,
        setFormData,
        blogList,
        setBlogList,
        loading,
        setLoading,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

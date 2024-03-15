import { useReducer } from "react";
import { BlogsContext } from "../context";
import { blogReducer, initialState } from "../reducers/BlogReducer";

const BlogsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  return (
    <BlogsContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};

export default BlogsProvider;

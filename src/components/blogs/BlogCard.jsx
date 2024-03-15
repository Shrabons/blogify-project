import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actions } from "../../action";
import ThreeDoteIcon from "../../assets/icons/3dots.svg";
import useAuthAxios from "../../hooks/useAuthAxios";
import { useAuthenticatin } from "../../hooks/useAuthentication";
import { useBlogs } from "../../hooks/useBlogs";
import BlogAction from "./BlogAction";
import BlogProfile from "./BlogProfile";
import BlogThumbnail from "./BlogThumbnail";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  const { auth } = useAuthenticatin();
  const { dispatch } = useBlogs();
  const { api } = useAuthAxios();

  const myBlog = blog?.author?.id == auth?.user?.id;

  const handleBlogDetails = async () => {
    dispatch({ type: actions.blog.DATA_FETCHING });

    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}`
      );

      if (response.status === 200) {
        dispatch({
          type: actions.blog.BLOG_DATA_SINGLE_BLOG,
          data: response.data,
        });

        navigate("/blog-details");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.blog.DATA_FETCH_ERROR, error: error.message });
    }
  };

  return (
    <div className="blog-card">
      <BlogThumbnail thumbnail={blog?.thumbnail} />
      <div className="mt-2 relative">
        <h3
          onClick={handleBlogDetails}
          className="text-slate-300 text-xl lg:text-2xl"
        >
          {blog?.title}
        </h3>

        <p className="mb-6 text-base text-slate-500 mt-1">{blog?.content}</p>

        <BlogProfile blog={blog} />
        {myBlog && (
          <div className="absolute right-0 top-0">
            <button onClick={() => setShow(!show)}>
              <img src={ThreeDoteIcon} alt="3dots of Action" />
            </button>
            {show && <BlogAction blog={blog} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

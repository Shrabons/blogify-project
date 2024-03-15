import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actions } from "../../action";
import useAuthAxios from "../../hooks/useAuthAxios";
import { useBlogs } from "../../hooks/useBlogs";

const MostPopular = () => {
  const navigate = useNavigate();
  const { dispatch } = useBlogs();
  const { api } = useAuthAxios();
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const popularFatching = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        );

        const data = await response.data;

        if (response.status === 200) {
          setPopular(data.blogs);
        }
      } catch (error) {
        console.error(error);
      }
    };
    popularFatching();
  }, []);

  const handlePopularBlog = async (popularBlogId) => {
    dispatch({ type: actions.blog.DATA_FETCHING });

    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${popularBlogId}`
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
    <div className="sidebar-card mt-6">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {popular.map((blog) => (
          <li key={blog.id}>
            <h3
              onClick={() => handlePopularBlog(blog.id)}
              className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
            >
              {blog.title}
            </h3>
            <p className="text-slate-600 text-sm">
              by
              <a href="./profile.html">
                {blog.author.firstName} {blog.author.firstName}
              </a>
              <span>· </span> {blog.likes.length} Likes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostPopular;

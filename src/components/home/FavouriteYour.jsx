import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actions } from "../../action";
import useAuthAxios from "../../hooks/useAuthAxios";
import { useBlogs } from "../../hooks/useBlogs";

const FavouriteYour = () => {
  const navigate = useNavigate();
  const { dispatch } = useBlogs();
  const { api } = useAuthAxios();
  const [favourite, setFavorite] = useState([]);

  useEffect(() => {
    const favouriteFatching = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
        );

        const data = await response.data;
        if (response.status === 200) {
          setFavorite(data.blogs);
        }
      } catch (error) {
        console.error(error);
      }
    };
    favouriteFatching();
  }, []);

  const handleFavouriteBlog = async (favBlogId) => {
    dispatch({ type: actions.blog.DATA_FETCHING });

    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${favBlogId}`
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
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>

      <ul className="space-y-5 my-5">
        {favourite?.map((fav) => (
          <li key={fav.id}>
            <h3
              onClick={() => handleFavouriteBlog(fav.id)}
              className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
            >
              {fav.title}
            </h3>
            <p className="text-slate-600 text-sm">
              {fav.tags.split(",").map((item) => ` # ${item} `)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouriteYour;

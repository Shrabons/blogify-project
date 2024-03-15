import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actions } from "../../action";
import DeleteBlog from "../../assets/icons/delete.svg";
import EidtBlog from "../../assets/icons/edit.svg";
import useAuthAxios from "../../hooks/useAuthAxios";
import { useBlogs } from "../../hooks/useBlogs";

const BlogAction = ({ blog }) => {
  const navigate = useNavigate();
  const { dispatch } = useBlogs();
  const { api } = useAuthAxios();
  const [mag, setMag] = useState("");

  const hanldeEditBlog = () => {
    dispatch({ type: actions.blog.BLOG_DATA_EDITED, data: blog });
    navigate("/editBlog");
  };

  const handleDeleteBlog = async () => {
    dispatch({ type: actions.blog.DATA_FETCHING });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}`
      );
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: actions.blog.BLOG_DATA_DELETED,
          data: blog.id,
        });
        dispatch({
          type: actions.profile.USER_DATA_DELETED,
          data: blog.id,
        });
      }
    } catch (error) {
      dispatch({ type: actions.blog.DATA_FETCH_ERROR, error: error.message });
    }
  };
  return (
    <div className="action-modal-container">
      <button
        onClick={hanldeEditBlog}
        className="action-menu-item hover:text-lwsGreen"
      >
        <img src={EidtBlog} alt="Edit" />
        Edit
      </button>

      <button
        onClick={handleDeleteBlog}
        className="action-menu-item hover:text-red-500"
      >
        <img src={DeleteBlog} alt="Delete" />
        Delete
      </button>
    </div>
  );
};

export default BlogAction;

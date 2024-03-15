import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import commentIcon from "../../assets/icons/comment.svg";
import heardFilledIcon from "../../assets/icons/heart-filled.svg";
import heardIcon from "../../assets/icons/heart.svg";

import useAuthAxios from "../../hooks/useAuthAxios";
import { useAuthenticatin } from "../../hooks/useAuthentication";
import { useBlogs } from "../../hooks/useBlogs";

const FloatingActions = ({ comments }) => {
  const { state } = useBlogs();
  const { api } = useAuthAxios();
  const { auth } = useAuthenticatin();
  let likeVlae = false;
  let likeCase = state.singleBlog.likes.filter((item) => {
    if (item.id === auth.user.id) {
      likeVlae = true;
    }
  });
  const [liked, setLiked] = useState(likeVlae);
  const [likeCount, setLikeCount] = useState(state.singleBlog.likes);
  const [favourite, setFavourite] = useState(state.singleBlog.isFavourite);

  const handleLikeControl = async () => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
          state?.singleBlog?.id
        }/like`
      );

      if (response.status === 200) {
        setLiked(true);
        setLikeCount(response.data.likes);
      }
    } catch (error) {
      console.error(error);
      setLiked(false);
    }
  };

  const handleFavourite = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
          state?.singleBlog?.id
        }/favourite`
      );

      if (response.status === 200) {
        setFavourite(response.data.isFavourite);
      }
    } catch (error) {
      console.error(error);
      favourite(state.singleBlog.isFavourite);
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <button type="button" onClick={handleLikeControl}>
            {liked ? (
              <AiFillLike className="text-2xl" />
            ) : (
              <AiOutlineLike className="text-2xl" />
            )}
          </button>
          <span>{likeCount.length}</span>
        </li>

        <li>
          <button type="button" onClick={handleFavourite}>
            {favourite ? (
              <img src={heardFilledIcon} alt="Favourite" />
            ) : (
              <img src={heardIcon} alt="Favourite" />
            )}
          </button>
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>{comments.length ?? 0}</span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default FloatingActions;

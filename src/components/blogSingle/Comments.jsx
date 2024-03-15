import React, { useState } from "react";
import useAuthAxios from "../../hooks/useAuthAxios";
import { useBlogs } from "../../hooks/useBlogs";
import CommentList from "./CommentList";
import FloatingActions from "./FloatingActions";

const Comments = () => {
  const { state } = useBlogs();
  const { api } = useAuthAxios();
  const [comments, setComments] = useState(state?.singleBlog?.comments);
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const hanldeCommentSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
          state?.singleBlog?.id
        }/comment`,
        { content: comment }
      );

      if (response.status === 200) {
        setComments([...response.data.comments]);
        setComment("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${
          state?.singleBlog?.id
        }/comment/${commentId}`
      );

      if (response.status === 200) {
        const del = comments.filter((item) => item.id !== commentId);
        setComments([...del]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <section id="comments">
        <div className="mx-auto w-full md:w-10/12 container">
          <h2 className="text-3xl font-bold my-8">
            Comments ({comments.length ?? 0})
          </h2>
          <div className="flex items -center space-x-4">
            <div className="avater-img">
              <img
                className="avater-img"
                src={`${import.meta.env.VITE_SERVER_IMAGE_UP_URL}/${
                  state?.singleBlog?.author?.avatar
                }`}
                alt="avatar"
              />
            </div>
            <form className="w-full">
              <div className="w-full">
                <textarea
                  className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                  placeholder="Write a comment"
                  onChange={handleChange}
                  rows={6}
                  value={comment}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={hanldeCommentSumbit}
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </form>
          </div>

          <CommentList comments={comments} onDelete={handleDeleteComment} />
        </div>
      </section>
      <FloatingActions comments={comments} />
    </>
  );
};

export default Comments;

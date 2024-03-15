import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { actions } from "../action";
import Field from "../components/common/Field";
import useAuthAxios from "../hooks/useAuthAxios";
import { useBlogs } from "../hooks/useBlogs";

const EditBlogPage = () => {
  const navigate = useNavigate();
  const [imgSection, setImgSection] = useState(false);
  const { api } = useAuthAxios();
  const { state, dispatch } = useBlogs();

  const { id, title, content, tags, thumbnail } = state.blog;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imgRef = useRef();

  const handleimageRef = () => {
    imgRef.current.addEventListener("change", blogThumbnail);
    imgRef.current.click();
  };

  const blogThumbnail = () => {
    setImgSection(imgRef.current.files[0]);
  };

  const handleBlogEdit = async (blogEditData) => {
    dispatch({ type: actions.blog.DATA_FETCHING });
    try {
      const UpdateformData = new FormData();
      UpdateformData.append("thumbnail", imgSection);
      UpdateformData.append("title", blogEditData.title);
      UpdateformData.append("tags", blogEditData.tags);
      UpdateformData.append("content", blogEditData.content);

      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`,
        UpdateformData
      );
      console.log(response.data);
      if (response.status === 200) {
        dispatch({ type: actions.blog.BLOG_DATA_EDITED, data: response.data });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: actions.blog.DATA_FETCH_ERROR, error: error.message });
    }
  };

  return (
    <section>
      <div className="container">
        <form onSubmit={handleSubmit(handleBlogEdit)} className="createBlog">
          {!imgSection && (
            <div className="text-center ">
              <img
                className="w-[120px] h-[120px] m-auto"
                src={`${
                  import.meta.env.VITE_SERVER_BASE_URL
                }/uploads/blog/${thumbnail}`}
                alt={title}
              />
              <p className="text-sm">
                Previuse Image. <mark>But New Image Required</mark>{" "}
              </p>
            </div>
          )}
          <div
            onClick={handleimageRef}
            className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4"
          >
            <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              {imgSection ? (
                <p className="flex items-center">
                  <span className="mr-3">{imgSection.name}</span>
                  <span>
                    <FaCheck className="text-3xl text-green-500" />
                  </span>
                </p>
              ) : (
                <div className="flex items-center justify-center">
                  <p>Upload Your Image</p>
                </div>
              )}
            </div>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              ref={imgRef}
              hidden
            />
          </div>

          <Field label="" error={errors.title}>
            <input
              {...register("title", {
                value: title,
                required: "title is required !",
              })}
              type="text"
              name="title"
              id="title"
              placeholder="Enter your blog title"
              className={`w-full p-3 bg-[#030317] border ${
                errors.title ? "border-red-500" : "border-white/20"
              } border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
            />
          </Field>

          <Field label="" error={errors.tags}>
            <input
              {...register("tags", {
                value: tags,
                required: "tags is required !",
              })}
              type="text"
              name="tags"
              id="tags"
              placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              className={`w-full p-3 bg-[#030317] border ${
                errors.tags ? "border-red-500" : "border-white/20"
              } border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
            />
          </Field>

          <Field label="" error={errors.content}>
            <textarea
              {...register("content", {
                value: content,
                required: "content is required !",
              })}
              placeholder="Write your blog content"
              rows="8"
              name="content"
              id="content"
              className={`w-full p-3 bg-[#030317] border ${
                errors.content ? "border-red-500" : "border-white/20"
              } border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
            />
          </Field>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Edit Blog
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditBlogPage;

import moment from "moment";
import { useBlogs } from "../../hooks/useBlogs";

const BlogDetails = () => {
  const { state } = useBlogs();
  const blogDetailsContent = state?.singleBlog;
  console.log(blogDetailsContent.createdAt);

  let allTags = blogDetailsContent.tags.split(",");
  let tag = allTags.map((item, index) => <li key={index}>{item}</li>);

  return (
    <section>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">
          {blogDetailsContent?.title}
        </h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img ">
              <img
                className="avater-img"
                src={`${import.meta.env.VITE_SERVER_IMAGE_UP_URL}/${
                  blogDetailsContent?.author?.avatar
                }`}
                alt={blogDetailsContent.firstName}
              />
            </div>
            <h5 className="text-slate-500 text-sm">
              {blogDetailsContent.author.firstName}{" "}
              {blogDetailsContent.author.lastName}
            </h5>
          </div>
          <span className="text-sm text-slate-700 dot">
            {moment(`${blogDetailsContent.createdAt}`).fromNow()}
          </span>
          <span className="text-sm text-slate-700 dot">
            {blogDetailsContent?.likes.length} Likes
          </span>
        </div>
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
            blogDetailsContent?.thumbnail
          }`}
          alt="profle"
        />

        <ul className="tags">{tag}</ul>

        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          <p>{blogDetailsContent.content}</p>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

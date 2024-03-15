import BlogCard from "./BlogCard";

const BlogList = ({ blogs }) => {
  return (
    <>
      <div className="my-6 space-y-4">
        {!!blogs && blogs.map((blog, i) => <BlogCard key={i} blog={blog} />)}
      </div>
    </>
  );
};

export default BlogList;

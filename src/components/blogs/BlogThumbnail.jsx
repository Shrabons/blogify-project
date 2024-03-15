const BlogThumbnail = ({ thumbnail }) => {
  return (
    <>
      <img
        className="blog-thumb"
        src={`${
          import.meta.env.VITE_SERVER_BASE_URL
        }/uploads/blog/${thumbnail}`}
        alt="thumbnail"
      />
    </>
  );
};

export default BlogThumbnail;

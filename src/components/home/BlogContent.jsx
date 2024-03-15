import { useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { actions } from "../../action";
import useAuthAxios from "../../hooks/useAuthAxios";
import { useBlogs } from "../../hooks/useBlogs";
import BlogList from "../blogs/BlogList";

const BlogContent = () => {
  const { api } = useAuthAxios();
  const { state, dispatch } = useBlogs();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  useEffect(() => {
    const blogGetData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=${page}`
        );

        const data = await response.data;

        if (response.status === 200) {
          if (data.blogs.length === 0) {
            setHasMore(false);
          } else {
            dispatch({
              type: actions.blog.DATA_FETCHED,
              data: data,
            });
            setPage((prevPage) => prevPage + 1);
          }
        }
      } catch (error) {
        dispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        blogGetData();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [page, hasMore]);

  if (state?.loading) {
    return <div>Data Loading ..........</div>;
  }

  if (state?.error) {
    return <div>error in fatching blog : {state?.error?.message}</div>;
  }

  return (
    <div className="space-y-3 md:col-span-5">
      <BlogList blogs={state?.blogs} />

      {hasMore && (
        <div className="flex items-center flex-col" ref={loaderRef}>
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>loading.....</p>
        </div>
      )}
    </div>
  );
};

export default BlogContent;

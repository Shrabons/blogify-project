import { useEffect } from "react";
import { actions } from "../../action";
import useAuthAxios from "../../hooks/useAuthAxios";
import { useAuthenticatin } from "../../hooks/useAuthentication";
import { useProfile } from "../../hooks/useProfile";
import BlogList from "../blogs/BlogList";

const MyBLogs = () => {
  const { state, dispatch } = useProfile();
  const { auth } = useAuthenticatin();
  const { api } = useAuthAxios();
  let blogs = state?.blogs;

  useEffect(() => {
    const fatchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        const data = await response.data;
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: data });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fatchProfile();
  }, []);

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <BlogList blogs={blogs} />
    </>
  );
};

export default MyBLogs;

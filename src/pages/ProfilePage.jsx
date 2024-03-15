import { useRef, useState } from "react";
import MyBLogs from "../components/profile/MyBLogs";
import ProfileMain from "../components/profile/ProfileMain";
import useAuthAxios from "../hooks/useAuthAxios";
import { useAuthenticatin } from "../hooks/useAuthentication";
import { useProfile } from "../hooks/useProfile";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAuthAxios();
  const { auth } = useAuthenticatin();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  // useEffect(() => {
  //   const blogGetData = async () => {
  //     try {
  //       const response = await api.get(
  //         `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
  //       );

  //       const data = await response.data;

  //       console.log(data);

  //       if (response.status === 200) {
  //         if (data.blogs.length === 0) {
  //           setHasMore(false);
  //         } else {
  //           dispatch({
  //             type: actions.profile.DATA_FETCHED,
  //             data: data,
  //           });
  //           setPage((prevPage) => prevPage + 1);
  //         }
  //       }
  //     } catch (error) {
  //       dispatch({
  //         type: actions.profile.DATA_FETCH_ERROR,
  //         error: error.message,
  //       });
  //     }
  //   };

  //   const onIntersection = (items) => {
  //     const loaderItem = items[0];

  //     if (loaderItem.isIntersecting && hasMore) {
  //       blogGetData();
  //     }
  //   };

  //   const observer = new IntersectionObserver(onIntersection);

  //   if (observer && loaderRef.current) {
  //     observer.observe(loaderRef.current);
  //   }

  //   return () => {
  //     if (observer) observer.disconnect();
  //   };
  // }, [page, hasMore]);

  // if (state?.error) {
  //   return <div>error in fatching blog : {state?.error?.message}</div>;
  // }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <ProfileMain />
        <MyBLogs />
        {/* {hasMore && <div ref={loaderRef}>Loading more blogs .....</div>} */}
      </div>
    </main>
  );
};

export default ProfilePage;

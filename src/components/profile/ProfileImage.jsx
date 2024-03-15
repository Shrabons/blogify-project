import { useRef } from "react";
import { toast } from "react-toastify";
import { actions } from "../../action";
import EditIcon from "../../assets/icons/edit.svg";
import useAuthAxios from "../../hooks/useAuthAxios";
import { useAuthenticatin } from "../../hooks/useAuthentication";
import { useProfile } from "../../hooks/useProfile";
import { useProfileImage } from "../../hooks/useProfileImage";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const { auth } = useAuthenticatin();
  const { api } = useAuthAxios();
  const { userProfileImg } = useProfileImage();
  const imageUpdateRef = useRef();

  let firstChar = auth?.user?.firstName.charAt(0).toUpperCase();

  const handleImageUpClick = (e) => {
    e.preventDefault();
    imageUpdateRef.current.addEventListener("change", upLoadingImage);
    imageUpdateRef.current.click();
  };

  const upLoadingImage = async () => {
    try {
      const formData = new FormData();
      for (const file of imageUpdateRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATE,
          data: response.data,
        });
        toast.success("The successfull profile Image uploaded !");
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px] ">
      {auth?.user?.avatar === null && state.user == undefined ? (
        <div className="w-full h-full bg-green-600 text-white grid place-items-center text-5xl rounded-full">
          <span className="">{firstChar}</span>
        </div>
      ) : (
        <div className="w-full h-full  grid place-items-center text-5xl rounded-full">
          <img
            className="w-full h-full  grid place-items-center text-5xl rounded-full"
            src={`${import.meta.env.VITE_SERVER_IMAGE_UP_URL}/${
              userProfileImg?.avatar
            }`}
            alt="profile"
          />
        </div>
      )}

      <form>
        <button
          onClick={handleImageUpClick}
          className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input type="file" id="file" ref={imageUpdateRef} hidden />
      </form>
    </div>
  );
};

export default ProfileImage;

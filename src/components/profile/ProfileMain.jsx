import { useProfileImage } from "../../hooks/useProfileImage";
import MyBio from "./MyBio";
import ProfileImage from "./ProfileImage";

const ProfileMain = () => {
  const { userProfileImg } = useProfileImage();

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage />

      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {userProfileImg.firstName} {userProfileImg.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{userProfileImg.email}</p>
      </div>

      <MyBio />

      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileMain;

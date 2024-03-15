import { useAuthenticatin } from "./useAuthentication";
import { useProfile } from "./useProfile";

export const useProfileImage = () => {
  const { auth } = useAuthenticatin();
  const { state } = useProfile();

  const userProfileImg = state?.user ?? auth?.user;
  return { userProfileImg };
};

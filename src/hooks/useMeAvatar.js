import { useProfile } from "./useProfile";

export const useMeAvatar = (blog) => {
  const { state } = useProfile();

  const isMe = blog?.author?.id === state?.user?.id;

  const avatarMe = isMe ? `${state?.user?.avatar}` : `${blog.author.avatar}`;

  const avatarMeUrl = `${import.meta.env.VITE_SERVER_IMAGE_UP_URL}/${avatarMe}`;

  return { avatarMeUrl };
};

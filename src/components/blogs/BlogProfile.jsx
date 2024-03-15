import moment from "moment";
import { Link } from "react-router-dom";
import { useMeAvatar } from "../../hooks/useMeAvatar";

const BlogProfile = ({ blog }) => {
  const { avatarMeUrl } = useMeAvatar(blog);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center capitalize space-x-2">
        <div className="avater-img bg-indigo-600 text-white">
          <img className="avater-img" src={avatarMeUrl} alt="avatar" />
        </div>

        <div>
          <h5 className="text-slate-500 text-sm">
            <Link to="/profile">{blog?.author?.firstName ?? "name"}</Link>
          </h5>
          <div className="flex items-center text-xs text-slate-700">
            <span>{moment(blog?.createdAt).fromNow()}</span>
          </div>
        </div>
      </div>

      <div className="text-sm px-2 py-1 text-slate-700">
        <span>{blog?.likes?.length ?? 0} Likes</span>
      </div>
    </div>
  );
};

export default BlogProfile;

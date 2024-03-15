import { AiFillDelete } from "react-icons/ai";
import { useAuthenticatin } from "../../hooks/useAuthentication";

const CommentList = ({ comments, onDelete }) => {
  const commentsReversed = [...comments].reverse();
  const { auth } = useAuthenticatin();

  return (
    <>
      {commentsReversed.map((comment) => (
        <div
          key={comment.id}
          className="flex items-start space-x-4 my-8 group/item"
        >
          <div className="avater-img bg-orange-600 text-white  ">
            <img
              className="avater-img"
              src={`${import.meta.env.VITE_SERVER_IMAGE_UP_URL}/${
                comment?.author?.avatar
              }`}
              alt="avatar"
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between mb-2">
              <h5 className="text-slate -500 font-bold">
                {comment?.author?.firstName} {comment?.author?.lastName}
              </h5>
              {auth?.user?.id === comment?.author?.id && (
                <button
                  onClick={() => onDelete(comment.id)}
                  className=" invisible block text-2xl text-red-500  group-hover/item:visible group-hover/item:transition"
                >
                  <AiFillDelete />
                </button>
              )}
            </div>

            <p className="text-slate-300">{comment?.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentList;

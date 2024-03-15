import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { actions } from "../../action";
import EditIcon from "../../assets/icons/edit.svg";
import useAuthAxios from "../../hooks/useAuthAxios";
import { useProfile } from "../../hooks/useProfile";
import { useProfileImage } from "../../hooks/useProfileImage";

const MyBio = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAuthAxios();
  const { userProfileImg } = useProfileImage();

  const [mybio, setMybio] = useState(userProfileImg?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleMyBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        { bio: mybio }
      );

      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEditMode(false);
    } catch (err) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: err.message,
      });
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {userProfileImg?.bio}
          </p>
        ) : (
          <textarea
            className="p-2 w-full leading-[188%] text-gray-600 lg:text-lg rounded-md"
            value={mybio}
            rows={4}
            cols={55}
            onChange={(e) => setMybio(e.target.value)}
          />
        )}
      </div>

      {!editMode ? (
        <>
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={() => setEditMode(true)}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
        </>
      ) : (
        <>
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={handleMyBioEdit}
          >
            <FaCheck className="text-2xl text-green-500 ml-1" />
          </button>
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={() => setEditMode(false)}
          >
            <FaTimes className="text-2xl text-red-500 mr-2" />
          </button>
        </>
      )}
    </div>
  );
};

export default MyBio;

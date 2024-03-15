import { actions } from "../action";

const initialState = {
  user: null,
  blogs: [],
  loading: false,
  error: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.data.user,
        blogs: [...action.data.blogs],
      };
    }

    case actions.profile.USER_DATA_EDITED: {
      console.log(action.data);
      return {
        ...state,
        loading: false,
        user: action.data.user,
      };
    }
    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actions.profile.IMAGE_UPDATE: {
      return {
        ...state,
        loading: false,
        user: action.data.user,
      };
    }
    case actions.profile.USER_DATA_DELETED: {
      console.log(action.data);
      console.log(state);
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((blog) => blog.id !== action.data),
      };
    }
  }
};

export { initialState, profileReducer };

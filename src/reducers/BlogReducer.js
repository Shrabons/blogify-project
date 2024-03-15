import { actions } from "../action";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case actions.blog.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.blog.DATA_FETCHED: {
      console.log(action.data);
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, ...action.data.blogs],
      };
    }

    case actions.blog.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.blog.BLOG_DATA_CREATE: {
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.data],
      };
    }
    case actions.blog.BLOG_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        blog: action.data,
      };
    }

    case actions.blog.BLOG_DATA_DELETED: {
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((blog) => blog.id !== action.data),
      };
    }

    case actions.blog.BLOG_DATA_SINGLE_BLOG: {
      return {
        ...state,
        loading: false,
        singleBlog: action.data,
      };
    }

    case actions.blog.BLOG_DATA_LINKED: {
      return {
        ...state,
        loading: false,
        blog: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export { blogReducer, initialState };

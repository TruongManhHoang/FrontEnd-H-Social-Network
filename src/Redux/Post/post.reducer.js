import { GET_PROFILE_REQUEST } from '../Auth/auth.actionType';
import {
  CREATE_COMMNET_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUETS,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUETS,
  LIKE_POST_SUCCESS,
} from './post.actionType';

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
  comments: [],
  newComment: null,
};

export const postReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_POST_REQUETS:
    case GET_PROFILE_REQUEST:
    case LIKE_POST_REQUETS:
      return { ...state, error: null, loading: true };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };
    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload, // Gán trực tiếp action.payload vào posts
        comments: action.payload.comments,
        loading: false,
        error: null,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((item) =>
          item.id === action.payload.id
            ? action.payload
            : item
        ),
        loading: false,
        error: null,
      };

    case CREATE_COMMNET_SUCCESS:
      return {
        ...state,
        newComment: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case LIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

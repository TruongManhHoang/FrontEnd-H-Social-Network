import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_REQUEST,
  SEARCH_USER_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  LOGOUT,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS, // Thêm LOGOUT
} from './auth.actionType';

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  users: [],
  searchUser: [],
  follow: [],
};

export const authReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case SEARCH_USER_REQUEST:
    case GET_ALL_USER_REQUEST:
    case FOLLOW_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        jwt: action.payload,
        loading: false,
        error: null,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: true,
        error: false,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        follow: [...state.follow, action.payload],
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case SEARCH_USER_FAILURE:
    case GET_ALL_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT: // Xử lý action LOGOUT
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

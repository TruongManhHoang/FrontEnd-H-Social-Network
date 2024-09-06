import {
  CREATE_REEL_FAILURE,
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  GET_ALL_REEL_FAILURE,
  GET_ALL_REEL_REQUEST,
  GET_ALL_REEL_SUCCESS,
  GET_REEL_BY_USER_FAILURE,
  GET_REEL_BY_USER_REQUEST,
  GET_REEL_BY_USER_SUCCESS,
} from './reel.actionType';

const initialState = {
  reels: [],
  loading: false,
  error: null,
};
export const reelReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_REEL_REQUEST:
    case GET_ALL_REEL_REQUEST:
    case GET_REEL_BY_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_REEL_SUCCESS:
      return {
        ...state,
        loading: false,
        reels: [...state.reels, action.payload],
        error: null,
      };
    case GET_ALL_REEL_SUCCESS:
      return {
        ...state,
        loading: false,
        reels: action.payload,
        error: null,
      };
    case GET_REEL_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        reels: action.payload,
        error: null,
      };
    case CREATE_REEL_FAILURE:
    case GET_ALL_REEL_FAILURE:
    case GET_REEL_BY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

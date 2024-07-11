import {
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS,
} from './message.actionType';

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null,
  user: [],
};

export const messageReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
    case CREATE_CHAT_REQUEST:
    case GET_ALL_CHAT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        chats: [action.payload, ...state.chats],
      };
    case GET_ALL_CHAT_SUCCESS:
      return {
        ...state,
        chats: action.payload,
      };
    default:
      return state;
  }
};

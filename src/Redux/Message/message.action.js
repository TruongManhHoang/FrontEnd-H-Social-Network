import { api, API_BASE_URL } from '../../config/api';
import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHAT_FAILURE,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS,
} from './message.actionType';

export const createMessage =
  (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_MESSAGE_REQUEST });
    try {
      const jwt = localStorage.getItem('jwt');
      const { data } = await api.post(
        `${API_BASE_URL}/messages/chat/${reqData.message.chatId}`,
        reqData.message,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: CREATE_MESSAGE_SUCCESS,
        payload: data.result,
      });
      console.log('created message', data.result);
    } catch (error) {
      console.log('Error', error);
      dispatch({
        type: CREATE_MESSAGE_FAILURE,
        payload: error,
      });
    }
  };

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });
  try {
    const jwt = localStorage.getItem('jwt');
    const { data } = await api.post(
      `${API_BASE_URL}/chats`,
      chat,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch({
      type: CREATE_CHAT_SUCCESS,
      payload: data,
    });
    console.log('created chat', data.result);
  } catch (error) {
    console.log('Error', error);
    dispatch({
      type: CREATE_CHAT_FAILURE,
      payload: error,
    });
  }
};

export const getAllChat = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CHAT_REQUEST });
  try {
    const { data } = await api.get(
      `${API_BASE_URL}/chats/user`
    );
    dispatch({
      type: GET_ALL_CHAT_SUCCESS,
      payload: data.result,
    });
    console.log('Get ALL Chat', data.result);
  } catch (error) {
    console.log('Error', error);
    dispatch({
      type: GET_ALL_CHAT_FAILURE,
      payload: error,
    });
  }
};

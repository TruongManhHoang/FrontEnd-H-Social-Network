import { API_BASE_URL, api } from '../../config/api';
import {
  CREATE_COMMNET_FAILURE,
  CREATE_COMMNET_REQUETS,
  CREATE_COMMNET_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUETS,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUETS,
  DELETE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUETS,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUETS,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUETS,
  LIKE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  SAVE_POST_REQUETS,
  SAVE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUETS,
  UPDATE_POST_SUCCESS,
} from './post.actionType';

export const createPostAction =
  (postData) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUETS });
    try {
      const jwt = localStorage.getItem('jwt');
      const { data } = await api.post(
        `${API_BASE_URL}/posts`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: data.result,
      });
      console.log('created post', data.result);
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: CREATE_POST_FAILURE,
        payload: error,
      });
    }
  };
export const updatePostAction =
  (postId, postData) => async (dispatch) => {
    dispatch({ type: UPDATE_POST_REQUETS });
    try {
      const jwt = localStorage.getItem('jwt');
      const { data } = await api.put(
        `${API_BASE_URL}/posts/update/user/${postId}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: UPDATE_POST_SUCCESS,
        payload: data.result,
      });
      console.log('update post', data.result);
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: UPDATE_POST_FAILURE,
        payload: error,
      });
    }
  };

export const deletePostAction =
  (postId) => async (dispatch) => {
    dispatch({ type: DELETE_POST_REQUETS });
    try {
      const jwt = localStorage.getItem('jwt');
      await api.delete(`${API_BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: postId,
      });
      console.log('Delete post', postId);
    } catch (error) {
      console.log('Error', error);
      dispatch({
        type: DELETE_POST_FAILURE,
        payload: error,
      });
    }
  };

export const createCommentAction =
  (commentData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMNET_REQUETS });
    try {
      const jwt = localStorage.getItem('jwt');
      const { data } = await api.post(
        `${API_BASE_URL}/comments/post/${commentData.postId}`,
        commentData.data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: CREATE_COMMNET_SUCCESS,
        payload: data.result,
      });
      console.log('created commnent', data.result);
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: CREATE_COMMNET_FAILURE,
        payload: error,
      });
    }
  };

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUETS });
  try {
    const { data } = await api.get(`${API_BASE_URL}/posts`);
    dispatch({
      type: GET_ALL_POST_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    console.log('error', error);
    dispatch({
      type: GET_ALL_POST_FAILURE,
      payload: error,
    });
  }
};

export const getUsersPostAction =
  () => async (dispatch) => {
    dispatch({ type: GET_USERS_POST_REQUETS });
    try {
      const jwt = localStorage.getItem('jwt'); // Lấy JWT từ localStorage
      const { data } = await api.get(
        `${API_BASE_URL}/posts/user`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: GET_USERS_POST_SUCCESS,
        payload: data.result,
      });
      console.log('get all post', data);
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: GET_USERS_POST_FAILURE,
        payload: error,
      });
    }
  };

export const likePostAction =
  (postId) => async (dispatch) => {
    dispatch({ type: LIKE_POST_REQUETS });
    try {
      const jwt = localStorage.getItem('jwt');
      const { data } = await api.put(
        `${API_BASE_URL}/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: LIKE_POST_SUCCESS,
        payload: data.result,
      });
      console.log('like post', data.result);
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: LIKE_POST_FAILURE,
        payload: error,
      });
    }
  };

export const savePostAction =
  (postId) => async (dispatch) => {
    dispatch({ type: SAVE_POST_REQUETS });
    try {
      const jwt = localStorage.getItem('jwt');
      const { data } = await api.put(
        `${API_BASE_URL}/posts/save/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: SAVE_POST_SUCCESS,
        payload: data.result,
      });
      console.log('save post', data.result);
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: SAVE_POST_FAILURE,
        payload: error,
      });
    }
  };

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

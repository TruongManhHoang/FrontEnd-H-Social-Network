import axios from 'axios';
import { API_BASE_URL, api } from '../../config/api';
import {
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from './auth.actionType';

export const loginUserAction =
  (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/signIn`,
        loginData.data
      );
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      console.log('login success', data);
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    } catch (error) {
      console.log('----------', error);
      dispatch({ type: LOGIN_FAILURE, payload: error });
    }
  };

export const registerUserAction =
  (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/signUp`,
        loginData.data
      );
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      console.log('register', data);
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    } catch (error) {
      console.log('----------', error);
      dispatch({ type: LOGIN_FAILURE, payload: error });
    }
  };

export const getProfileAction =
  (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log('----------', error);
      dispatch({
        type: GET_PROFILE_FAILURE,
        payload: error,
      });
    }
  };

export const updateProfileAction =
  (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
      const jwt = localStorage.getItem('jwt');
      const { data } = await api.put(
        `${API_BASE_URL}/users`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log('update Profile', data);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data.result,
      });
    } catch (error) {
      console.log('----------', error);
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload: error,
      });
    }
  };

export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await api.get(
      `${API_BASE_URL}/users/search?query=${query}`
    );
    console.log('search user', data);
    dispatch({
      type: SEARCH_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('----------', error);
    dispatch({
      type: SEARCH_USER_FAILURE,
      payload: error,
    });
  }
};
export const getAllUserAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/users`);
    dispatch({
      type: GET_ALL_USER_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    console.log('Error', error);
    dispatch({
      type: GET_ALL_USER_FAILURE,
      payload: error,
    });
  }
};
export const followUserAction =
  (userId) => async (dispatch) => {
    dispatch({ type: FOLLOW_USER_REQUEST });
    try {
      const jwt = localStorage.getItem('jwt');
      const { data } = await api.put(
        `${API_BASE_URL}/users/follow/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: FOLLOW_USER_SUCCESS,
        payload: data.result,
      });
      console.log('follow', data.result);
    } catch (error) {
      console.log('Error', error);
      dispatch({
        type: FOLLOW_USER_FAILURE,
        payload: error,
      });
    }
  };

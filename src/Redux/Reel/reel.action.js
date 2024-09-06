import { api, API_BASE_URL } from '../../config/api';
import {
  CREATE_REEL_FAILURE,
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  GET_ALL_REEL_FAILURE,
  GET_ALL_REEL_REQUEST,
  GET_ALL_REEL_SUCCESS,
  GET_REEL_BY_USER_REQUEST,
} from './reel.actionType';

export const createReel = (reel) => async (dispatch) => {
  dispatch({ type: CREATE_REEL_REQUEST });
  try {
    const jwt = localStorage.getItem('jwt');
    const { data } = await api.post(
      `${API_BASE_URL}/reels`,
      reel,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch({
      type: CREATE_REEL_SUCCESS,
      payload: data.result,
    });
    console.log('Create Reel: ', data.result);
  } catch (error) {
    dispatch({
      type: CREATE_REEL_FAILURE,
      payload: error,
    });
  }
};
export const getAllReel = () => async (dispatch) => {
  dispatch({ type: GET_ALL_REEL_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/reels`);

    dispatch({
      type: GET_ALL_REEL_SUCCESS,
      payload: data.result,
    });
    console.log('Get All Reel', data.result);
  } catch (error) {
    console.log('error', error);
    dispatch({
      type: GET_ALL_REEL_FAILURE,
      payload: error,
    });
  }
};

export const getReelByUser = () => async (dispatch) => {
  dispatch({ type: GET_REEL_BY_USER_REQUEST });
  try {
    const jwt = localStorage.getItem('jwt');
    const { data } = await api.get(
      `${API_BASE_URL}/reels/user`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: GET_ALL_REEL_SUCCESS,
      payload: data.result,
    });
    console.log('Get All Reel', data.result);
  } catch (error) {
    console.log('error', error);
    dispatch({
      type: GET_ALL_REEL_FAILURE,
      payload: error,
    });
  }
};

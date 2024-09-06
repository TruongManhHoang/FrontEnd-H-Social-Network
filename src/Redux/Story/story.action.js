import { api, API_BASE_URL } from '../../config/api';
import {
  CREATE_STORY_FAILURE,
  CREATE_STORY_REQUEST,
  CREATE_STORY_SUCCESS,
  GET_ALL_STORY_FAILURE,
  GET_ALL_STORY_REQUEST,
  GET_ALL_STORY_SUCCESS,
} from './story.actionType';

export const createStory =
  (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_STORY_REQUEST });
    try {
      const jwt = localStorage.getItem('jwt');
      const { data } = await api.post(
        `${API_BASE_URL}/stories`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: CREATE_STORY_SUCCESS,
        payload: data.result,
      });
      console.log('create story', data.result);
    } catch (error) {
      console.log('Create Failure', error);
      dispatch({
        type: CREATE_STORY_FAILURE,
        payload: error,
      });
    }
  };
export const getAllStory = () => async (dispatch) => {
  dispatch({ type: GET_ALL_STORY_REQUEST });
  try {
    const { data } = await api.get(
      `${API_BASE_URL}/stories`
    );
    dispatch({
      type: GET_ALL_STORY_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    console.log('Get all story fail', error);
    dispatch({
      type: GET_ALL_STORY_FAILURE,
      payload: error,
    });
  }
};

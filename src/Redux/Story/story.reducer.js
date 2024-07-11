import {
  CREATE_STORY_FAILURE,
  CREATE_STORY_REQUEST,
  CREATE_STORY_SUCCESS,
  GET_ALL_STORY_FAILURE,
  GET_ALL_STORY_REQUEST,
  GET_ALL_STORY_SUCCESS,
} from './story.actionType';

const initialState = {
  loading: false,
  error: null,
  stories: [],
};

export const storyReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_STORY_REQUEST:
    case GET_ALL_STORY_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        stories: [...state.stories, action.payload], // Thêm câu chuyện mới vào mảng `stories`
        loading: false,
        error: null,
      };

    case GET_ALL_STORY_SUCCESS:
      return {
        ...state,
        stories: action.payload, // Giả định `action.payload` là một mảng chứa tất cả các câu chuyện
        loading: false,
        error: null,
      };

    case CREATE_STORY_FAILURE:
    case GET_ALL_STORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

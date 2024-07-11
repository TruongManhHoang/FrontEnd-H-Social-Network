import { api, API_BASE_URL } from "../../config/api"
import { CREATE_POST_REQUETS } from "../Post/post.actionType"
import { CREATE_REEL_FAILURE, CREATE_REEL_SUCCESS } from "./reel.actionType";


export const createReel = (reel) => async (dispatch) => {
    dispatch({type: CREATE_POST_REQUETS})
    try {
        const jwt = localStorage.getItem('jwt');
        const { data } = await api.post(`${API_BASE_URL}/reels`, reel,
            {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
        );
        dispatch({type: CREATE_REEL_SUCCESS, payload: data.result})
        console.log("Create Reel: ", data.result)
    } catch (error) {
      dispatch({
        type: CREATE_REEL_FAILURE,
        payload: error,
      });
        
    }
}
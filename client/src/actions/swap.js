import * as api from "../api";
import { FETCH_REQUESTS } from "../constants/actionTypes";
//Action Creators

export const getSwapRequests = () => async (dispatch) => {
  try {
    const { data } = await api.swapNotification();
    dispatch({ type: FETCH_REQUESTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

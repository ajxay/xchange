import * as api from "../api";
import {
  FETCH_USERS,
  DEACTIVATE_USER,
  UPDATE_USER,
} from "../constants/actionTypes";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    dispatch({ type: FETCH_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deactivateUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.deactivateAccount(id);
    dispatch({ type: DEACTIVATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, userData);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

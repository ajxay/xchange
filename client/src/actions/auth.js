import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //sign inn the user
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/posts");
  } catch (error) {
    console.log(error);
  }
};

export const signinAsAdmin = (formData, navigate) => async (dispatch) => {
  try {
    //sign inn the user
    const { data } = await api.signInAsAdmin(formData);

    dispatch({ type: AUTH, data });

    navigate("/admin");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //sign up the user
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/posts");
  } catch (error) {
    console.log(error);
  }
};

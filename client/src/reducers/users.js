import {
  FETCH_USERS,
  DEACTIVATE_USER,
  UPDATE_USER,
} from "../constants/actionTypes";

const users = (users = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    case DEACTIVATE_USER:
      return users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );

    default:
      return users;
  }
};
export default users;

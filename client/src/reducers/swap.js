import { FETCH_REQUESTS, LOGOUT } from "../constants/actionTypes";

const requests = (requests = [], action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      return action.payload;

    default:
      return requests;
  }
};
export default requests;

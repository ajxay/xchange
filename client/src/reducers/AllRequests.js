import { FETCH_ALL_REQUESTS } from "../constants/actionTypes";

const allRequests = (allRequests = [], action) => {
  switch (action.type) {
    case FETCH_ALL_REQUESTS:
      return action.payload;

    default:
      return allRequests;
  }
};
export default allRequests;

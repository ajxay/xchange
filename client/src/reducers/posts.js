import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  DELETE,
  FETCH_BY_SEARCH,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";

const posts = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case FETCH_BY_SEARCH:
      return action.payload;

    case FETCH_POST:
      return action.payload;

    case CREATE:
      return [...posts, action.payload];

    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case COMMENT:
      // return posts.map((post) => {
      //   if (post._id === action.payload._id) return action.payload;
      //   return post;
      // });
      return action.payload;

    case DELETE:
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
};
export default posts;

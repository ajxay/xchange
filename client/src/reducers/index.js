import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import users from "./users";
import requests from "./swap";
import allRequests from "./AllRequests";

export default combineReducers({
  posts,
  auth,
  users,
  requests,
  allRequests,
});

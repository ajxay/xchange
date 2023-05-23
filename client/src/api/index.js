import axios from "axios";

// for dev
// const API = axios.create({ baseURL: "http://localhost:3000/api" });
// for prod
const API = axios.create({ baseURL: "https://ajayasok.tk/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostsByLocation = (location) =>
  API.get(
    `/posts/location?lat=${location.coordinates[0] || "none"}&lgt=${
      location.coordinates[1] || "none"
    }`
  );

export const fetchPostsBySearch = (searchQuery) =>
  API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}`);

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (FormData) => API.post("/users/signin", FormData);

export const signInAsAdmin = (FormData) => API.post("/users/signin", FormData);

export const signUp = (FormData) => API.post("/users/signup", FormData);

//Users
export const getUsers = () => API.get("/admin/users");
export const fetchUser = (id) => API.get(`/users/${id}`);
export const updateUser = (id, userData) => API.patch(`/users/${id}`, userData);

export const deactivateAccount = (id) =>
  API.patch(`/admin/users/${id}/deactivate`);
export const disablePost = (id) => API.patch(`/admin/posts/${id}/disable`);
//summary
export const getSummary = (title) =>
  API.get(`/openai/summary?title=${title || "none"}`);

//swap Request

export const swapRequest = (request) => API.post("/swap", request);
export const swapNotification = () => API.get("/swap");
export const acceptRequest = (id, selected) =>
  API.get(`/swap/accept?requestId=${id}&selected=${selected}`);
export const declineRequest = (id) => API.get(`/swap/decline/${id}`);
//for admin
export const swapRequests = () => API.get("/swap/requests/");

import React, { useEffect, useState } from "react";
import Posts from "../../../Posts/Posts";
import Form from "../../../Form/Form";

import { useDispatch } from "react-redux";
import {
  getPosts,
  getPostsByLocation,
  getPostsBySearch,
} from "../../../../actions/posts";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LocationInput from "../../../Auth/LocationInput";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (location) {
      dispatch(getPostsByLocation(location));
      navigate(
        `/posts/location?lat=${location.coordinates[0] || "none"}&lgt=${
          location.coordinates[1] || "none"
        }`
      );
    } else {
      dispatch(getPosts());
    }
  }, [currentId, dispatch, location]);

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      navigate(`/posts/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/posts");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <>
      <Form
        currentId={currentId}
        setCurrentId={setCurrentId}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="flex justify-between mr-12 ">
        <div className="w-1/5">
          <LocationInput
            locationSearch={true}
            location={location}
            setLocation={setLocation}
          />
        </div>
        <div className="flex space-x-1">
          <input
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            type="text"
            className="block w-full px-3 h-10 text-slate-400 bg-slate-900 border rounded-full border-none focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search Books..."
          />
          <button
            onClick={searchPost}
            className="px-3 h-10 text-slate-400 bg-slate-900 rounded-full "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <Posts setCurrentId={setCurrentId} setShowModal={setShowModal} />
    </>
  );
}

export default Home;

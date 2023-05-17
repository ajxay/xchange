import React from "react";
import Post from "../Posts/Post/Post";
import { useSelector } from "react-redux";
import Shimmer from "../Shimmer/Shimmer";
function Collection({ user, type }) {
  const allPosts = useSelector((state) => state.posts);

  const favs = allPosts.filter((post) => post.likes.includes(user._id));
  const myPost = allPosts.filter((post) => post.creator === user._id);
  let posts;
  if (type === "favourites") {
    posts = favs;
  } else {
    posts = myPost;
  }

  console.log(allPosts[0].creator, user._id);
  const setCurrentId = false;
  const setShowModal = false;
  return (
    <>
      {!posts.length ? (
        <div className="lg:w-full bg-slate-200 text-gray-600 body-font mx-auto flex justify-center ml-4 flex-wrap ">
          No Posts
        </div>
      ) : (
        <div className="lg:w-full bg-slate-200 text-gray-600 body-font mx-auto flex justify-center ml-4 flex-wrap ">
          {posts.map((post) => {
            return (
              <Post
                setCurrentId={setCurrentId}
                setShowModal={setShowModal}
                post={post}
                key={post._id}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Collection;

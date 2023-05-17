import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import Shimmer from "../Shimmer/Shimmer";
import Container from "../Container/Container";

function Posts({ setCurrentId, setShowModal }) {
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <Shimmer />
  ) : (
    <Container>
      {posts.map((post) => {
        if (post.exchanged) {
          return (
            <React.Fragment key={post._id}>
              {/* Add your exchanged post UI here */}
            </React.Fragment>
          );
        } else {
          return (
            <Post
              setCurrentId={setCurrentId}
              setShowModal={setShowModal}
              post={post}
              key={post._id}
            />
          );
        }
      })}
    </Container>
  );
}

export default Posts;

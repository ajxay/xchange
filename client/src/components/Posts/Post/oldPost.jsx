import moment from "moment";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [likes, setLikes] = useState(post?.likes);

  const hasLikedpost = likes.find(
    (like) => like === (user?.result?.sub || user?.result?._id)
  );

  const userId = user?.result.sub || user?.result?._id;

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedpost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      ) ? (
        <>
          <MdFavorite />
        </>
      ) : (
        <>
          <MdOutlineFavoriteBorder />
        </>
      );
    }
    return (
      <>
        <MdOutlineFavoriteBorder />
      </>
    );
  };

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full bg-slate-900 m-5 rounded">
      <section onClick={openPost}>
        <div className="block relative h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={post.selectedFile}
          />
        </div>
      </section>

      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {post.creator}
        </h3>
        <h2 className="text-grey-400 title-font text-lg font-medium">
          {post.message}
        </h2>
        <p className="mt-1">{moment(post.createdAt).fromNow()}</p>
        <div className="flex justify-between ">
          {(user?.result?.sub === post?.creator ||
            user?.result?._id === post?.creator) && (
            <button
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              Edit
            </button>
          )}

          <button className="flex text-2xl text-red-700">
            {(user?.result?.sub === post?.creator ||
              user?.result?._id === post?.creator) && (
              <AiOutlineDelete
                onClick={() => {
                  dispatch(deletePost(post._id));
                }}
              />
            )}

            <button
              disabled={!user?.result}
              onClick={handleLike}
              className="mx-2"
            >
              <Likes />
            </button>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;

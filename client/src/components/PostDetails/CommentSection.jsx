import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = () => {
    const finalComment = `${user.result.name}:${comment}`;
    dispatch(commentPost(finalComment, post._id));
  };

  return (
    <>
      <div className="text-slate-400">
        <p>comment section</p>
        {comments?.map((c, i) => (
          <p>{c}</p>
        ))}
      </div>
      {user?.result?.name && (
        <div class="w-full mb-4 border border-gray-600 rounded-lg bg-gray-500 dark:bg-gray-700 dark:border-gray-600">
          <div class="px-4 py-2 bg-dark rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">
              Your comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="comment"
              rows="4"
              class="w-full px-0 text-sm text-gray-900 dark:bg-gray-800  dark:text-gray-400 dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              disabled={!comment}
              onClick={handleClick}
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
            <div class="flex pl-0 space-x-1 sm:pl-2"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentSection;

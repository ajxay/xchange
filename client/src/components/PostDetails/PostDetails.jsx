import React, { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import Chat from "./Chat";
import CommentSection from "./CommentSection";
import { fetchUser, swapRequest } from "../../api";
import useReverseGeocode from "../../utils/useReverseGeocode";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const PostDetails = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + myPosts.length) % myPosts.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % myPosts.length);
  };
  const [showModal, setShowModal] = React.useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState(null);
  const [options, SetOptions] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  const posts = useSelector((state) => state.posts);
  const myPosts = posts.filter((post) => post.creator === user._id);

  const { id } = useParams();
  const post = posts.filter((post) => post._id === id)[0];
  const dispatch = useDispatch();

  const getSeller = async (id) => {
    const { data } = await fetchUser(id);
    setSeller(data);
  };
  useEffect(() => {
    dispatch(getPosts());
    if (post) {
      getSeller(post.creator);
    }
  }, [id, dispatch]);
  // const address = useReverseGeocode(
  //   post?.location?.coordinates[0],
  //   post?.location?.coordinates[1]
  // );
  const handleSelect = (id) => {
    if (!options.includes(id)) {
      SetOptions([...options, id]);
    } else {
      const index = options.indexOf(id);
      options.splice(index, 1);
      SetOptions(options);
    }
  };
  const sendRequest = () => {
    if (options.length < 1) {
      alert("Select Option");
    } else {
      const requestObj = {
        book: post?._id,
        bookName: post?.title,
        senderName: user?.username,
        sender: user?._id,
        receiver: post.creator,
        options,
      };
      console.log(requestObj);
      try {
        swapRequest(requestObj);
      } catch (error) {
        console.log(error);
      }
      SetOptions([]);
      setShowModal(false);
    }
  };

  if (!post) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading post..
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="lg:w-1/3 md:w-1/2 p-4 w-full bg-slate-900 m-5   text-slate-400 rounded">
        <div className="block relative h-58 rounded overflow-hidden">
          <img
            alt="Book Image"
            className="object-cover object-center w-full h-4/3 block"
            src={post?.selectedFile}
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <h3 className="text-gray-500 text-sm tracking-widest title-font mb-1">
              {moment(post?.createdAt).fromNow()}
            </h3>
            <div className="flex flex-col items-center">
              <h3 className="text-gray-500 text-lg tracking-widest title-font">
                <MdOutlineFavoriteBorder />
              </h3>
              <h3 className="text-gray-500 text-sm tracking-widest title-font mb-1">
                {post?.likes?.length}
              </h3>
            </div>
          </div>
          <h2 className="text-grey-400 title-font text-xl font-medium">
            {post.title}
          </h2>

          <p className="mt-1">By {post.message}</p>
        </div>
        {/* <CommentSection post={post} /> */}
        {post?.creator !== user?._id && (
          <button
            // onClick={() => setIsOpen(!isOpen)}
            onClick={() => setShowModal(true)}
            style={{
              color: "white",
              backgroundColor: "#1890ff",
              padding: "12px",
              border: "1px solid rgb(24, 144, 255)",
              borderRadius: "3px",
            }}
          >
            {isOpen && "Close"} Chat with Seller
          </button>
        )}
      </div>
      <div className="w-full">{isOpen && <Chat seller={seller} />}</div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Swap Request</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative  p-6 flex-auto ">
                  {/* cars carousal */}
                  <>
                    <h3 className="text-xl font-semibold">Swap With</h3>

                    <div className="flex justify-center items-center mt-10">
                      <div className="relative w-full max-w-3xl">
                        <div className="flex items-center justify-between">
                          <button
                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
                            onClick={handlePrevClick}
                          >
                            <ChevronLeftIcon className="h-6 w-6" />
                          </button>
                          <div className="overflow-x-scroll whitespace-nowrap">
                            {myPosts.map((card, index) => (
                              <div
                                key={card._id}
                                className={`w-80 relative inline-block m-2 p-4 rounded-lg shadow-md ${
                                  index === currentIndex
                                    ? "bg-blue-100"
                                    : "bg-white"
                                }`}
                              >
                                <input
                                  className="absolute right-5 -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                  type="checkbox"
                                  id="inlineCheckbox1"
                                  value="option1"
                                  onChange={() => handleSelect(card._id)}
                                />
                                <h2 className="text-lg font-bold mb-2">
                                  {card.title}
                                </h2>
                                <p className="text-gray-700">{card.message}</p>
                              </div>
                            ))}
                          </div>
                          <button
                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
                            onClick={handleNextClick}
                          >
                            <ChevronRightIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => sendRequest()}
                  >
                    Send Request{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default PostDetails;

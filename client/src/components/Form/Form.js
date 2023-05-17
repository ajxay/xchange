import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import LocationInput from "../Auth/LocationInput";
import { getSummary } from "../../api";
import { BiBookAdd } from "react-icons/bi";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function Form({ currentId, setCurrentId, setShowModal, showModal }) {
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    location: {
      type: "Point",
      coordinates: [],
    },
    summary: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(
        createPost({
          ...postData,
          name: user?.result?.name,
          creatorImage: user?.result?.picture,
        })
      );
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    }
    setShowModal(false);
    clear();
  };
  const getSummaryFromApi = async (title) => {
    setSummaryLoading(true);
    const { data } = await getSummary(title);

    setPostData({ ...postData, summary: data.trim() });
    if (data || postData.summary.length > 5) {
      setSummaryLoading(false);
    }
  };

  const fetchSummary = async () => {
    getSummaryFromApi(postData.title);
  };

  const clear = () => {
    setCurrentId = null;
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
      location: {
        type: "Point",
        coordinates: [],
      },
      summary: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <div>
        <p className="text-white">Please Log in to create posts</p>
      </div>
    );
  }

  return (
    <>
      <button
        className="bg-slate-900 align-middle block ml-auto mr-auto mt-5 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <p className="flex">
          Create Ad{" "}
          <p className="text-xl ml-2">
            <BiBookAdd />
          </p>
        </p>
      </button>
      {showModal ? (
        <>
          <form
            className="md:w-3/5"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <div
              className={`${
                summaryLoading ? "backdrop-filter backdrop-blur-lg " : ""
              } transition duration-500 ease-out justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 py-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between px-5 border-b border-solid border-slate-200 rounded-t">
                    <p className=" text-slate-900 text-3xl  font-semibold py-2">
                      {currentId ? "Editing" : "Creating"} a Post
                    </p>
                    <button
                      type="button"
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <div className="relative px-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      <section className="text-gray-600 body-font">
                        <div className="container relative bg-slate-900 rounded px-5 py-5 mx-auto">
                          <div className="mb-6">
                            <input
                              name="title"
                              variant="outlined"
                              label="Title"
                              value={postData.title}
                              onChange={(e) =>
                                setPostData({
                                  ...postData,
                                  title: e.target.value,
                                })
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Title"
                              required
                            />
                          </div>
                          <div className="mb-6">
                            <input
                              name="tags"
                              variant="outlined"
                              label="Tags"
                              value={postData.tags}
                              onChange={(e) =>
                                setPostData({
                                  ...postData,
                                  tags: e.target.value,
                                })
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Tags"
                              required
                            />
                          </div>
                          <div className="mb-6">
                            <input
                              name="message"
                              variant="outlined"
                              label="Message"
                              value={postData.message}
                              onChange={(e) =>
                                setPostData({
                                  ...postData,
                                  message: e.target.value,
                                })
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Author"
                              required
                            />
                          </div>
                          <div className="mb-1">
                            <textarea
                              rows="4"
                              name="message"
                              variant="outlined"
                              label="Message"
                              value={postData.summary}
                              onChange={(e) =>
                                setPostData({
                                  ...postData,
                                  summary: e.target.value,
                                })
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Summary"
                              required
                            />
                          </div>
                          {postData.title.length > 5 && (
                            <button
                              type="button"
                              onClick={() => fetchSummary()}
                              className="float-right font-normal text-sm text-yellow-200 "
                            >
                              {summaryLoading ? (
                                <div className="h-screen absolute bottom-0 left-32 flex  flex-col items-center justify-center">
                                  <ClimbingBoxLoader
                                    className="h-5"
                                    color={"yellow"}
                                    loading={true}
                                    size={10}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                  />
                                  Lodaing..
                                </div>
                              ) : (
                                <> Auto generate Summary?</>
                              )}
                            </button>
                          )}
                          <div className="my-6 mt-10">
                            <LocationInput
                              postData={postData}
                              setPostData={setPostData}
                              post={true}
                            />
                          </div>
                          <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                              setPostData({
                                ...postData,
                                selectedFile: base64,
                              })
                            }
                          />
                        </div>
                      </section>
                    </p>
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Form;

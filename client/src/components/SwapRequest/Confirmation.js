import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { acceptRequest, declineRequest } from "../../api";
import Chat from "../PostDetails/Chat";
import PropTypes from "prop-types";
import { useAlert } from "react-alert";

const Confirmation = ({ showModal, setShowModal, requestId }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedReq, setAcceptedReq] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  const alert = useAlert();

  const request = useSelector(
    (state) => state.requests.filter((reqest) => requestId === reqest._id)[0]
  );

  const options = useSelector((state) =>
    state.posts.filter((post) => request.options.includes(post._id))
  );

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + options.length) % options.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % options.length);
  };
  const handleDecline = () => {
    declineRequest(request._id);
    alert.show("Request Declined!");
    setShowModal(false);
  };
  const handleAccept = async () => {
    if (!selectedValue) {
      alert.show("Not selected Any option");
    } else {
      setIsLoading(true);
      const { data } = await acceptRequest(request._id, selectedValue);
      setAcceptedReq(data);
      setIsLoading(false);
      alert.show("Request Accepted");
    }
  };

  const handleChat = () => {
    console.log(request.senderName, "sender");
    setOpenChat(true);

    // setShowModal(false);
  };

  const onSelectionChange = (value) => {
    setSelectedValue(value);
  };

  if (!requestId) return null;

  return (
    <div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                // style={{ width: "400px" }}
                className="border-0  rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none"
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Swap Request</h3>
                  <button
                    className="ml-auto z-50  border-0 text-white  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-red-600 z-50  font-medium h-6 w-6 text-xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative  p-6 flex-auto ">
                  {/* cars carousal */}
                  <>
                    <div className="inline-flex">
                      <h3 className="text-md font-semibold mr-2">
                        {request.senderName}
                      </h3>
                      <p> has reqested for your </p>
                      <h3 className="text-md font-semibold mx-2">
                        {request.bookName}
                      </h3>
                      <p> with these options: </p>
                    </div>

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
                            {options.map((card, index) => (
                              <div
                                key={card._id}
                                className={`w-80 relative inline-block m-2 p-4 rounded-lg shadow-md ${
                                  index === currentIndex
                                    ? "bg-blue-100"
                                    : "bg-white"
                                }`}
                              >
                                <input
                                  className="absolute right-5 "
                                  id="inlineCheckbox1"
                                  type="radio"
                                  value={card._id}
                                  checked={selectedValue === card._id}
                                  onChange={(e) =>
                                    onSelectionChange(e.target.value)
                                  }
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
                    <div className="inline-flex mt-8">
                      <h3 className="text-sm font-semibold mr-2">Accept</h3>
                      <p className="text-sm">
                        {" "}
                        the request to continue to chat with
                      </p>
                      <h3 className="text-sm font-semibold mx-2">
                        {request.senderName}:
                      </h3>
                    </div>
                  </>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <div>
                    {!acceptedReq && (
                      <button
                        className="bg-red-500 text-white active:bg-red-600  font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleDecline()}
                      >
                        Decline
                      </button>
                    )}
                    {!acceptedReq ? (
                      <>
                        {!isLoading ? (
                          <button
                            className={`bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${
                              isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            type="button"
                            onClick={() => handleAccept()}
                            disabled={isLoading}
                          >
                            {isLoading ? "Loading..." : "Accept"}
                          </button>
                        ) : (
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => handleAccept()}
                          >
                            Accept{" "}
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleChat()}
                      >
                        chat
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {openChat ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                style={{ width: "400px" }}
                className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Send Message</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpenChat(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto w-4/3">
                  <div>
                    <Chat seller={{ username: request.senderName }} />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenChat(false)}
                  >
                    Close
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

Confirmation.propTypes = {
  requestId: PropTypes.string.isRequired,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default Confirmation;

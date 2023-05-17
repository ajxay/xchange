import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { getSwapRequests } from "../../actions/swap";
import { useSelector, useDispatch } from "react-redux";
import Confirmation from "../SwapRequest/Confirmation";
import { Link } from "react-router-dom";

const Requests = () => {
  const dispatch = useDispatch();
  //   const [requests, setRequests] = useState(requestsData);
  const [showPendingSend, setShowPendingSend] = useState(true);
  const [showPendingReceived, setShowPendingReceived] = useState(true);
  // const [received, setReceived] = useState([]);
  // const [sent, setSent] = useState([]);

  const [user, setUser] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [requestId, setRequestId] = useState("");

  const notification = useSelector((state) => state.requests);

  const sent = notification.filter(
    (request) => request.sender === user?.result._id
  );
  const received = notification.filter(
    (request) => request.receiver === user?.result._id
  );

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getSwapRequests());
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [notification.length]);

  const handleAccept = (id) => {
    setRequestId(id);
    setShowModal(true);
  };

  return (
    <div className="flex p-10 h-screen flex-row">
      <div className="flex-1 i bg-slate-300 h-max p-5 mx-2 rounded-md">
        <h2 className="text-xl font-bold mb-4"> Requests Sent</h2>
        <button
          className={`mr-4 mb-4 px-8 py-2 focus:outline-none rounded ${
            showPendingSend
              ? "bg-grey-400 border-b-4 border-indigo-500"
              : "bg-white"
          }`}
          onClick={() => setShowPendingSend(true)}
        >
          Pending Requests
        </button>
        <button
          className={`mr-4 mb-4 px-8 py-2 focus:outline-none rounded ${
            !showPendingSend
              ? "bg-grey-400 border-b-4 border-indigo-500"
              : "bg-white"
          }`}
          onClick={() => setShowPendingSend(false)}
        >
          Accepted Requests
        </button>
        <Transition
          show={showPendingSend}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div ref={ref}>
              {/* {requests
                .filter((request) => request.status === "pending")
                .map((request) => (
                  <div key={request.id} className="mb-4 p-4 border">
                    <h3 className="font-bold">{request.title}</h3>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </button>
                  </div>
                ))} */}

              <div className="w-full">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Book Name</th>
                      <th className="px-4 py-2 text-left">Sender Name</th>
                      <th className="px-4 py-2 text-left">Options</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sent
                      .filter(
                        (request) =>
                          request.status === "pending" ||
                          request.status === "declined"
                      )
                      .map((request) => (
                        <tr key={request.id}>
                          <td className=" px-4 py-6">{request.bookName}</td>
                          <td className=" px-4 py-2">{request.senderName}</td>
                          <td className=" px-4 py-2">
                            <ul>
                              {request.options &&
                                request.options.map((option) => {
                                  const post = posts.find(
                                    (post) => post._id === option
                                  );
                                  return post ? (
                                    <li key={option}>{post.title}</li>
                                  ) : null;
                                })}
                            </ul>
                          </td>
                          <td className=" px-4 py-2">{request.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Transition>
        <Transition
          show={!showPendingSend}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div ref={ref}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Book Name</th>
                    <th className="px-4 py-2 text-left">Sender Name</th>
                    <th className="px-4 py-2 text-left">In exchange with</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Chat</th>
                  </tr>
                </thead>
                <tbody>
                  {sent
                    .filter((request) => request.status === "accepted")
                    .map((request) => (
                      <tr key={request.id}>
                        <td className=" px-4 py-6">{request.bookName}</td>
                        <td className=" px-4 py-2">{request.senderName}</td>
                        <td className=" px-4 py-2">
                          <ul>
                            {request.opted && (
                              <p>
                                {
                                  posts.find(
                                    (post) => post._id === request.opted
                                  )?.title
                                }
                              </p>
                            )}
                          </ul>
                        </td>
                        <td className=" px-4 py-2">{request.status}</td>
                        <td className=" px-4 py-2">
                          <Link to="/chat">
                            <button className="bg-slate-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                              Chat
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </Transition>
      </div>
      <div className="flex-1 h-max bg-slate-300 p-5 mx-2 rounded-md">
        <h2 className="text-xl font-bold mb-4">Requests Received</h2>
        <button
          className={`mr-4 mb-4 px-8 py-2 focus:outline-none rounded ${
            showPendingReceived
              ? "bg-grey-400 border-b-4 border-indigo-500"
              : "bg-white"
          }`}
          onClick={() => setShowPendingReceived(true)}
        >
          Pending Requests
        </button>
        <button
          className={`mr-4 mb-4 px-8 py-2 focus:outline-none rounded ${
            !showPendingReceived
              ? "bg-grey-400 border-b-4 border-indigo-500"
              : "bg-white"
          }`}
          onClick={() => setShowPendingReceived(false)}
        >
          Accepted Requests
        </button>
        <Transition
          show={showPendingReceived}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div ref={ref}>
              {/* {requests
                .filter((request) => request.status === "pending")
                .map((request) => (
                  <div key={request.id} className="mb-4 p-4 border">
                    <h3 className="font-bold">{request.title}</h3>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </button>
                  </div>
                ))} */}

              <div className="w-full">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Book Name</th>
                      <th className="px-4 py-2 text-left">Sender Name</th>
                      <th className="px-4 py-2 text-left">Options</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {received
                      .filter(
                        (request) =>
                          request.status === "pending" ||
                          request.status === "declined"
                      )
                      .map((request) => (
                        <tr key={request.id}>
                          <td className=" px-4 py-6">{request.bookName}</td>
                          <td className=" px-4 py-2">{request.senderName}</td>
                          <td className=" px-4 py-2">
                            <ul>
                              {request.options &&
                                request.options.map((option) => {
                                  const post = posts.find(
                                    (post) => post._id === option
                                  );
                                  return post ? (
                                    <li key={option}>{post.title}</li>
                                  ) : null;
                                })}
                            </ul>
                          </td>
                          <td className=" px-4 py-2">{request.status}</td>
                          <td className=" px-4 py-2">
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                              onClick={() => handleAccept(request._id)}
                            >
                              Accept
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Transition>
        <Transition
          show={!showPendingReceived}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div ref={ref}>
              <table className="w-full">
                {received.length > 0 ? (
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Book Name</th>
                      <th className="px-4 py-2 text-left">Sender Name</th>
                      <th className="px-4 py-2 text-left">In exchange with</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Chat</th>
                    </tr>
                  </thead>
                ) : (
                  <p className="font-bold ">No Accepted Requests! </p>
                )}
                <tbody>
                  {received
                    .filter((request) => request.status === "accepted")
                    .map((request) => (
                      <tr key={request.id}>
                        <td className=" px-4 py-6">{request.bookName}</td>
                        <td className=" px-4 py-2">{request.senderName}</td>
                        <td className=" px-4 py-2">
                          <ul>
                            {request.opted && (
                              <p>
                                {
                                  posts.find(
                                    (post) => post._id === request.opted
                                  )?.title
                                }
                              </p>
                            )}
                          </ul>
                        </td>
                        <td className=" px-4 py-2">{request.status}</td>
                        <td>
                          <Link to="/chat">
                            <button className="bg-slate-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                              Chat
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </Transition>
      </div>
      {showModal && (
        <Confirmation
          requestId={requestId}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default Requests;

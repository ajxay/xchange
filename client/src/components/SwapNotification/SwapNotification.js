import React, { useEffect, useRef, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { RiNotification2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getSwapRequests } from "../../actions/swap";

const SwapNotification = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [requestId, setRequestId] = useState("");
  let notification = [];

  notification = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    dispatch(getSwapRequests());
  }, [dispatch]);

  const openRequest = (id) => {
    setRequestId(id);
    setShowModal(true);
  };

  function ShimmerCard() {
    return (
      <>
        <div className="w-full h-20 my-4">
          <div className="h-full border-2 flex border-gray-200 rounded-lg overflow-clip">
            {/* <div className="lg:h-48 leading-relaxed  bg-gray-400 md:h-36 w-full object-cover object-center"></div> */}
            {/* <h2 className="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
            <h1 className="w-1/2 mb-4 h-6 animate-pulse bg-gray-500"></h1> */}
            <div className="p-2 mr-5">
              <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400"></p>
              <p className="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400"></p>
              <p className="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-indigo-300"></p>
              <div className="flex items-center flex-wrap ">
                <a className="bg-indigo-300 h-4 animate-pulse mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></a>
                <span className="bg-indigo-300 w-16 mt-2 h-4 animate-pulse mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1"></span>
              </div>
            </div>

            <h1 className="w-1/4 m-4 h-12 animate-pulse bg-gray-500"></h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <div a className="relative inline-block text-left">
      <div className="mt-1">
        {notification.length > 0 && (
          <span className="absolute top-0 left-3 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {notification.length}
          </span>
        )}
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <p
                  className={classNames(
                    active
                      ? "bg-gray-100  text-gray-900"
                      : "text-gray-700 font-semibold",
                    "block px-4 py-2 text-sm font-semibold"
                  )}
                >
                  Notifications
                </p>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 w-full"
                  )}
                >
                  {notification?.length === 0 ? (
                    <>
                      <ShimmerCard />
                      <ShimmerCard />
                      <ShimmerCard />
                    </>
                  ) : (
                    notification.map((item) => {
                      return (
                        <div className="py-1">
                          <Menu.Item>
                            <div
                              className="h-full border-2 border-gray-200 rounded-lg"
                              onClick={() => openRequest(item._id)}
                            >
                              <div className="p-2 mr-5">
                                <p className="mb-3 flex w-full text-sm ">
                                  {`You have received an Xchange
                                                  request for ${item?.bookName} from
                                                    ${item?.senderName}
                                                  `}
                                </p>
                              </div>
                            </div>
                          </Menu.Item>
                        </div>
                      );
                    })
                  )}
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </div>
  );
};

export default SwapNotification;

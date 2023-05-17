import { useEffect, useRef, useState, Fragment } from "react";

import logo from "../../logo/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import { RiChatSmile2Line, RiNotification2Line } from "react-icons/ri";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);

  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/");
  };
  // const getNotifications = async () => {
  //   const { data } = await swapNotification();
  //   setNotification(data);
  //   console.log(data, "notification");
  // };

  // const notification = useSelector((state) => (user ? state.requests : []));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  if (location.pathname === "/" && user === null) {
    return null;
  }

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
    <nav className="w-full bg-slate-900 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-0 md:block">
            <a>
              {/* <h2 className="text-2xl text-slate-400 font-bold">Xchange</h2> */}
              <Link to="/">
                <img src={logo} alt="" className="h-20" />
              </Link>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 hover:text-blue-600">
                {user === null ? (
                  <Link to="/">Home</Link>
                ) : (
                  <Link to="/posts">Home</Link>
                )}
              </li>
              {/* <li className="text-gray-600 hover:text-blue-600">
                <a href="javascript:void(0)">Blog</a>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <a href="javascript:void(0)">About US</a>
              </li> */}
              {user && (
                <>
                  <li className="text-gray-600 text-2xl hover:text-blue-600">
                    <Link to="/chat">
                      <RiChatSmile2Line />
                    </Link>
                  </li>
                  <li className="text-gray-600 cursor-pointer  hover:text-blue-600">
                    <Link to="/requests">Requests</Link>
                  </li>
                  <li className="text-gray-600  hover:text-blue-600">
                    <Link to="/profile">Profile</Link>
                  </li>
                </>
              )}
              {user ? (
                <>
                  <li
                    onClick={logout}
                    className="cursor-pointer text-gray-600 hover:text-blue-600"
                  >
                    Logout
                  </li>
                </>
              ) : (
                <li className="text-gray-600 hover:text-blue-600">
                  <Link to="/auth">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

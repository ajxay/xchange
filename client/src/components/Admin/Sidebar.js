import { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { FcList, FcMindMap, FcSettings } from "react-icons/fc";

import logo from "../../logo/logo.png";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-slate-900 w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <div className="flex justify-between">
            <img src={logo} alt="" className="h-12 inline-block" />
            <h6 className="uppercase text-white text-md tracking-wider mt-4 ">
              admin
            </h6>
          </div>
          <hr className="my-2 min-w-full" />
          <div className="flex mt-6 flex-col">
            <ul className="flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-4">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-4 rounded-sm p-2 bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-slate-200 shadow-xl"
                      : "flex items-center gap-4 text-sm text-slate-200 font-light px-4 py-3 rounded-lg"
                  }
                >
                  <FcSettings size={25} />
                  Dashboard
                </NavLink>
              </li>
              {/* <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/settings"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-4 rounded-sm p-2 bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-xl"
                      : "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  }
                >
                  <FcSettings size={25} />
                  Settings
                </NavLink>
              </li> */}
              <li className="rounded-lg mb-2 ">
                <NavLink
                  to="/admin/posts"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-4 rounded-sm p-2 bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-xl"
                      : "flex items-center gap-4 text-sm text-gray-200 font-light px-4 py-3 rounded-lg"
                  }
                >
                  <FcList size={25} />
                  Posts
                </NavLink>
              </li>
              <li className="rounded-lg mb-2 text-gray-700">
                <NavLink
                  to="/admin/users"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-4 rounded-sm p-2 bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-slate-200 shadow-xl"
                      : "flex items-center gap-4 text-sm text-slate-200 font-light px-4 py-3 rounded-lg"
                  }
                >
                  <FcMindMap size={25} />
                  Users
                </NavLink>
              </li>
              {/* <li className="px-4 rounded-lg mb-2 text-gray-700">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-sm font-light py-3"
                >
                  <FcMindMap size={25} />
                  Login
                </a>
              </li> */}
              {/* <li className="px-4 rounded-lg mb-2 text-gray-700">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/register"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-sm font-light py-3"
                >
                  <FcMindMap size={25} />
                  Register
                </a>
              </li> */}
              {/* <li className="px-4 rounded-lg mb-2 text-gray-700">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/landing"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-sm font-light py-3"
                >
                  <FcMindMap size={25} />
                  Landing Page
                </a>
              </li>
              <li className="px-4 rounded-lg mb-2 text-gray-700">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/profile"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-sm font-light py-3"
                >
                  <FcMindMap size={25} />
                  Profile Page
                </a>
              </li> */}
            </ul>
            {/* 
            <ul className="flex-col min-w-full flex list-none absolute bottom-0">
              <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white mb-2">
                <a
                  href="https://material-tailwind.com/documentation/quick-start"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-sm font-light py-3"
                >
                  <FcMindMap size={25} />
                  Documentation
                </a>
              </li>
              <li className="bg-gradient-to-tr from-purple-500 to-purple-700 px-4 rounded-lg text-white">
                <a
                  href="https://www.creative-tim.com/product/material-tailwind-dashboard-react"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-4 text-sm font-light py-3"
                >
                  Free Download
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </>
  );
}

import AppContainer from "./components/Container/AppContainer";
import React, { lazy, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Pages/Admin/Dashboard";
import Sidebar from "./components/Admin/Sidebar";
import Settings from "./components/Pages/Admin/Settings";
// import Tables from "./components/Pages/Admin/Tables";
import Users from "./components/Pages/Admin/Users";
import ChatsPage from "./components/ChatsPage";
// import Modal from "./components/Form/Modal";
import ProfileCard from "./components/Admin/ProfileCard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./utils/ErrorFallback";
import Shimmer from "./components/Shimmer/Shimmer";
import Requests from "./components/Navbar/Requests";
import Posts from "./components/Pages/Admin/Posts";

const Home = lazy(() => import("./components/Pages/User/Home/Home"));

function App() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <>
        <Sidebar />
        <div className="md:ml-64">
          <Routes>
            <Route
              path="/admin"
              exact
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => <Navigate to="/" />}
                >
                  <Suspense fallback={<Shimmer />}>
                    <Dashboard />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route path="/admin/settings" Component={Settings} />
            <Route path="/admin/posts" Component={Posts} />
            <Route path="/admin/users" Component={Users} />
          </Routes>
        </div>
      </>
    );
  }

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route
            path="/"
            exact
            Component={() =>
              !user ? <LandingPage /> : <Navigate to="/posts" />
            }
          />

          <Route
            path="/posts"
            exact
            element={
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => <Navigate to="/" />}
              >
                <Suspense fallback={<Shimmer />}>
                  <Home />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route path="/profile" exact Component={ProfileCard} />
          <Route path="/chat" exact Component={ChatsPage} />
          {/* <Route path="/modal" exact Component={Modal} /> */}
          <Route path="/requests" exact Component={Requests} />

          <Route path="/posts/search" exact Component={Home} />
          <Route path="/posts/location" exact Component={Home} />

          <Route path="/posts/:id" Component={PostDetails} />
          <Route
            path="/auth"
            exact
            Component={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
          />
        </Routes>
      </AppContainer>
    </GoogleOAuthProvider>
  );
}

export default App;

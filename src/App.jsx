import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import "./App.css";
import axios from "./config/axiosConfig";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "./stateContext/stateContext";
import { Home } from "./pages/Home";
import { Main } from "./pages/Main";
import AppLayout from "./Layout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "./pages/Profile";
import { Post } from "./pages/Post";
import { OtherProfile } from "./pages/OtherProfile";

const App = () => {
  const [authState, setAuthState] = useState({
    userId: 0,
    username: "",
    status: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get("/users/auth", {
          withCredentials: true,
        });

        if (response.data.error) {
          setAuthState((prev) => ({ ...prev, status: false }));
        } else {
          setAuthState({
            username: response.data.username,
            userId: response.data.id,
            status: true,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching auth status:", error);

        setAuthState((prev) => ({ ...prev, status: false }));
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <AppLayout>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoutes>
                    <Home />
                  </ProtectedRoutes>
                }
              />
              <Route path="/main" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoutes>
                    <Profile />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/profile/:username"
                element={
                  <ProtectedRoutes>
                    <OtherProfile />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/post/:postId"
                element={
                  <ProtectedRoutes>
                    <Post />
                  </ProtectedRoutes>
                }
              />
            </Routes>
          </AppLayout>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;

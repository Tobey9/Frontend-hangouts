import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import "./styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axiosConfig";
import { AuthContext } from "../stateContext/stateContext";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const data = { email, password };
    axios.post("/users/login", data).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
        toast.error("Can't login, please try again");
      } else {
        toast.success("Login successful");
        setAuthState({
          userId: response.data.userId,
          username: response.data.username,
          status: true,
        });
        navigate("/");
      }
    });
  };

  const handleGoogleLogin = () => {
    // Correctly point to the /api proxy path, which Netlify will forward to your backend.
    window.location.href = "/api/users/authGoogle";
  };

  return (
    <div className="login">
      <h2>Sign in to Hangouts</h2>

      <button onClick={handleGoogleLogin}>
        <FcGoogle />
        Sign in with Google
      </button>
      <p>or</p>

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-button" onClick={login}>
        Login
      </button>

      <p>
        Don't have an account <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

import React from "react";
import { FcGoogle } from "react-icons/fc";
import "./styles/Main.css";
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <div className="main">
      <h1>Hangouts</h1>

      <div className="right-side">
        <h2>Happening now</h2>
        <h3>Join today.</h3>

        <button className="google-button">
          <FcGoogle /> Sign in with Google
        </button>
        <p>OR</p>
        <Link to="/register">
          <button className="create-button">Create Account</button>
        </Link>

        <p className="small">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>

        <p>
          <strong>Already have an account?</strong>
        </p>
        <Link to="/login">
          <button className="sign-in-button">Sign in</button>
        </Link>
      </div>
    </div>
  );
};

import React from "react";
import "./Navbar.css";
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "./config/axiosConfig";
import { toast } from "react-toastify";

export const Navbar = () => {
  const handleLogout = async () => {
    try {
      await axios.post("/users/logout", {}, { withCredentials: true });
      toast.success("Logout successful");
      window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed, please try again");
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <h3>
          <strong>Hangout</strong>
        </h3>
      </div>

      <div className="center">
        <div className="top">
          <Link to="/profile">
            <div className="logo">
              <IoPersonOutline />
            </div>
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="icons">
          <div>
            <p>For You</p>
          </div>
          <div>
            <p>Following</p>
          </div>
          <div>
            <p>Your Interest</p>
          </div>
          <div>
            <p>Your Interest</p>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="input-container">
          <IoSearchOutline className="icon" />
          <input type="text" placeholder="Search Hangout" />
        </div>
      </div>
    </div>
  );
};

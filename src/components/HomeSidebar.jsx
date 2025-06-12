import React from "react";
import "./HomeSidebar.css";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";

import axios from "../config/axiosConfig";

import { IoSearchOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const HomeSidebar = () => {
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
    <div className="home-sidebar">
      <Link to="/">
        <div>
          <IoHomeOutline className="icon" /> <p>Home</p>
        </div>
      </Link>

      <div>
        <IoSearchOutline className="icon" /> <p>Explore</p>
      </div>
      <div>
        <IoNotificationsOutline className="icon" /> <p>Notifications</p>
      </div>
      <div>
        <IoMailOutline className="icon" /> <p>Messages</p>
      </div>
      <Link to="/profile">
        <div>
          <IoPersonOutline className="icon" /> <p>Profile</p>
        </div>
      </Link>

      <div onClick={handleLogout} className="logout">
        <IoMdExit className="icon" /> <p>Logout</p>
      </div>
    </div>
  );
};

import React from "react";
import "./HomeSidebar.css";
import { IoNotificationsOutline } from "react-icons/io5";

import { IoSearchOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

export const HomeSidebar = () => {
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

      <div>
        <IoEllipsisHorizontalCircle className="icon" /> <p>More</p>
      </div>
      <button>Post</button>
    </div>
  );
};

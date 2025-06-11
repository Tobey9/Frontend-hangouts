import React from "react";
import "./Navbar.css";
import { IoSearchOutline } from "react-icons/io5";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <h3>
          <strong>Hangout</strong>
        </h3>
      </div>

      <div className="center">
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

      <div className="right">
        <div className="input-container">
          <IoSearchOutline className="icon" />
          <input type="text" placeholder="Search Hangout" />
        </div>
      </div>
    </div>
  );
};

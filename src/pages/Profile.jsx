import React from "react";
import "./styles/Profile.css";
import { HomeSidebar } from "../components/HomeSidebar";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileContent } from "../components/ProfileContent";

export const Profile = () => {
  return (
    <div className="profile">
      <HomeSidebar />
      <div className="profile-container">
        <ProfileHeader />
        <ProfileContent />
      </div>
    </div>
  );
};

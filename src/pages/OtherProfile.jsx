import React, { useEffect, useState } from "react";
import { HomeSidebar } from "../components/HomeSidebar";
import { ProfileHeader } from "../components/OtherUser/profileHeader";
import "./styles/OtherProfile.css";
import { useParams } from "react-router-dom";
import axios from "../config/axiosConfig";
import { ProfileContent } from "../components/OtherUser/ProfileContent";

export const OtherProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/profile/${username}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);
  return (
    <div className="other-profile">
      <HomeSidebar />
      <div className="profile-container">
        <ProfileHeader />
        <ProfileContent user={user} />
      </div>
    </div>
  );
};

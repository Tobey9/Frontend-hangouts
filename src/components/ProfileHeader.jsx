import React, { useEffect, useState } from "react";
import "./ProfileHeader.css";
import axios from "../config/axiosConfig";
import { IoPersonOutline } from "react-icons/io5";
import { EditProfile } from "./EditProfile";

export const ProfileHeader = () => {
  const [profile, setProfile] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/users/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-header">
      <div className="background">
        <div className="avatar-container">
          {profile?.avatar_url ? (
            <img src={profile?.avatar_url} alt="User avatar" />
          ) : (
            <IoPersonOutline className="fallback-avatar" />
          )}
        </div>
        <button
          onClick={() => setShowEditProfile(true)}
          className="edit-button"
        >
          Edit Profile
        </button>

        {showEditProfile && (
          <EditProfile onClose={() => setShowEditProfile(false)} />
        )}
      </div>

      <div className="profile-info">
        <h2>{profile?.name}</h2>
        <p>@{profile?.username}</p>
        <p>{profile?.bio}</p>
        <div className="stats">
          <span>{profile?.followers.length} Followers</span>
          <span>{profile?.following.length} Following</span>
        </div>
      </div>

      <div className="links">
        <div>
          <p>Posts</p>
        </div>
        <div>
          <p>Replies</p>
        </div>
        <div>
          <p>Highlights</p>
        </div>
        <div>
          <p>Articles</p>
        </div>
        <div>
          <p>Media</p>
        </div>
        <div>
          <p>Likes</p>
        </div>
      </div>
    </div>
  );
};

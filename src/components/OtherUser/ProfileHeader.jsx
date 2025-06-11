import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import { IoPersonOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import "./ProfileHeader.css";
import { FollowButton } from "./FollowButton";

export const ProfileHeader = () => {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/users/profile/${username}`, {
          withCredentials: true,
        });
        console.log("response.data =", response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [username]);
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

        <FollowButton userId={profile?.id} />
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

      <div className="links-profile">
        <div>
          <p>Posts</p>
        </div>
        <div>
          <p>Replies</p>
        </div>
      </div>
    </div>
  );
};

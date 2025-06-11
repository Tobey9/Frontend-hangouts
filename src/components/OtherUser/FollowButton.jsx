import React, { useState } from "react";
import axios from "../../config/axiosConfig";
import "./ProfileHeader.css";

export const FollowButton = ({ userId }) => {
  const [showFollow, setShowFollow] = useState(false);

  const handleFollow = async () => {
    try {
      await axios.post(`/follow/${userId}/follow`);
      console.log("Successfully following!");
      setShowFollow(true);
    } catch (err) {
      setShowFollow(false);
      console.log("Failed to follow", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`/follow/${userId}/unfollow`);
      console.log("Successfully Unfollow");
      setShowFollow(false);
    } catch (err) {
      setShowFollow(true);
      console.log("Failed to unfollow", err);
    }
  };

  return (
    <>
      {!showFollow ? (
        <button className="follow-button" onClick={handleFollow}>
          Follow
        </button>
      ) : (
        <button className="follow-button" onClick={handleUnfollow}>
          Following
        </button>
      )}
    </>
  );
};

import React, { useContext, useEffect, useState, useRef } from "react";
import "./UserPost.css";
import { AuthContext } from "../stateContext/stateContext";
import axios from "../config/axiosConfig";
import { IoPersonOutline } from "react-icons/io5";
import { IoImageSharp } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { TiLocationOutline } from "react-icons/ti";
import { IoUnlinkSharp } from "react-icons/io5";

export const UserPost = ({ setPosts }) => {
  const { authState } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef();
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);

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

  const handleImageIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      console.log("Selected image:", selectedFile);
    }
  };

  const handlePost = async () => {
    // Handle post submission logic here
    const formData = new FormData();
    formData.append("content", post);
    if (image) {
      formData.append("imageUrl", image); // File upload
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl); // Text URL
    }

    try {
      const newPost = await axios.post(
        "/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
        { withCredentials: true }
      );
      // Optionally reset
      setPosts((prev) => [newPost.data, ...prev]);
      setPost("");
      setImage(null);
      setImageUrl("");
    } catch (err) {
      console.error("Error posting:", err);
    }
  };

  if (!profile) return null;

  return (
    <div className="user-post">
      <div className="user">
        <div className="avatar-container">
          {profile?.avatar_url ? (
            <img src={profile?.avatar_url} alt="User avatar" />
          ) : (
            <IoPersonOutline className="fallback-avatar" />
          )}
        </div>

        <textarea
          name=""
          id=""
          onChange={(e) => setPost(e.target.value)}
          placeholder="What's happening?"
        ></textarea>
      </div>

      <div className="buttons">
        <div className="left">
          <IoImageSharp className="icon" onClick={handleImageIconClick} />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />

          <IoUnlinkSharp
            className="icon"
            onClick={() => setShowImageUrlInput(!showImageUrlInput)}
          />

          <BsEmojiSmile className="icon" />
          <TiLocationOutline className="icon" />
        </div>

        <div className="right">
          <button className="post-button" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>

      {/* 👉 Move the URL input here so it's below the buttons */}
      {showImageUrlInput && (
        <div className="image-url-input">
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

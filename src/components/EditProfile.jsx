import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import axios from "../config/axiosConfig";

export const EditProfile = ({ onClose }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // URL string
  const [avatarFile, setAvatarFile] = useState(null); // File object

  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    // Fetch current user data to prefill
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/users/profile");
        const { name, bio, avatar_url } = res.data;
        setName(name || "");
        setBio(bio || "");
        setAvatarUrl(avatar_url || "");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl("");

      setShowUrlInput(false);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (avatarFile) {
      formData.append("avatar_url", avatarFile);
    } else if (avatarUrl) {
      formData.append("avatar_url", avatarUrl);
    }

    try {
      await axios.put(
        "/users/profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
        {
          withCredentials: true,
        }
      );
      onClose(); // close modal
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="edit-profile">
      <div className="edit-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>Edit Profile</h2>
        <div className="input-container">
          <label>Name</label>
          <input
            value={name}
            type="text"
            placeholder=""
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Photo Link (or upload below)</label>
          <input
            value={avatarUrl}
            type="text"
            placeholder=""
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="input-container">
          <label>Bio</label>
          <input
            value={bio}
            type="text"
            placeholder=""
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";

export const ProfileContent = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/user/${user.id}`, {
          withCredentials: true,
        });

        console.log("response.data =", response.data);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (user?.id) {
      fetchData();
    }
  }, [user]);
  return (
    <div className="profile-content">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {Array.isArray(posts) &&
            posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="content-container">
                  <div className="avatar-container">
                    {post?.User?.avatar_url ? (
                      <img src={post.User.avatar_url} alt="User avatar" />
                    ) : (
                      <IoPersonOutline className="fallback-avatar" />
                    )}
                  </div>
                  <div className="content">
                    <h3>{post.User.name}</h3>
                    <p>{post.content}</p>
                    {post.image_url && (
                      <div className="image-container">
                        <img src={post.image_url} alt="Post" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

import React, { useEffect, useState, useContext } from "react";
import "./HomeContent.css";
import axios from "../config/axiosConfig";
import {
  IoChatbubbleOutline,
  IoHeartOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { UserPost } from "./UserPost";
import { CommentModal } from "./CommentModal";
import { Link } from "react-router-dom";
import { AuthContext } from "../stateContext/stateContext";

export const HomeContent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { authState } = useContext(AuthContext);

  const [activeCommentPostId, setActiveCommentPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/posts/public");

        console.log("response.data =", response.data);

        setPosts(response.data);
        setLoading(false);

        console.log("Auth userId:", authState?.userId);
        console.log(
          "Posts loaded:",
          posts.map((p) => ({ id: p.id, userId: p.User?.id }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (authState?.userId !== undefined) {
      fetchData();
    }
  }, [authState?.userId]);

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `/posts/post/${postId}/like`,
        {},
        { withCredentials: true }
      );
      // Update posts state to toggle likedByCurrentUser for the liked post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likedByCurrentUser: !post.likedByCurrentUser }
            : post
        )
      );
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/post/${postId}`, { withCredentials: true });
      setPosts((prev) => {
        const filtered = prev.filter((post) => post.id !== postId);
        console.log("Remaining posts after delete:", filtered);
        filtered.forEach((p) => {
          console.log(`Post ${p.id} user:`, p.User);
        });
        return filtered;
      });
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="home-content">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <UserPost setPosts={setPosts} />

          {Array.isArray(posts) &&
            posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="content-container">
                  <div className="avatar-container">
                    {post?.User?.avatar_url ? (
                      <img src={post?.User.avatar_url} alt="User avatar" />
                    ) : (
                      <IoPersonOutline className="fallback-avatar" />
                    )}
                  </div>
                  <div className="content">
                    <div className="post-header">
                      <Link to={`/profile/${post?.User?.username}`}>
                        <h3>
                          {post?.User?.name}{" "}
                          <span>@{post?.User?.username}</span>
                        </h3>
                      </Link>
                    </div>

                    <Link to={`/post/${post.id}`}>
                      <p>{post.content}</p>
                      {post.image_url && (
                        <div className="image-container">
                          <img src={post.image_url} alt="Post" />
                        </div>
                      )}
                    </Link>
                    <IoChatbubbleOutline
                      className="icon"
                      onClick={() => setActiveCommentPostId(post.id)}
                    />

                    <IoHeartOutline
                      className={`icon ${
                        post.likedByCurrentUser ? "text-white" : ""
                      }`}
                      onClick={() => handleLike(post.id)}
                    />

                    {activeCommentPostId === post.id && (
                      <CommentModal
                        postId={post.id}
                        onClose={() => setActiveCommentPostId(null)}
                      />
                    )}
                  </div>

                  {post.User &&
                    authState?.userId &&
                    post.User.id === authState.userId && (
                      <div className="delete">
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

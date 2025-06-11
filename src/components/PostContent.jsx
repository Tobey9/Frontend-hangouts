import React, { useContext, useEffect, useState } from "react";
import "./PostContent.css";
import { useParams } from "react-router-dom";
import axios from "../config/axiosConfig";
import { IoPersonOutline } from "react-icons/io5";
import { IoChatbubbleOutline, IoHeartOutline } from "react-icons/io5";
import { AuthContext } from "../stateContext/stateContext";

export const PostContent = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/post/${postId}`);
        console.log("fetch data =", response.data);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/post/${postId}/comments`);
        console.log("response.data =", response.data);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (authState?.userId !== undefined) {
      fetchData();
      fetchComments();
    }
  }, [authState?.userId, postId]);

  const handleComment = async (postId) => {
    try {
      const response = await axios.post(
        `/posts/post/${postId}/comments`,
        { content: newComment },
        { withCredentials: true }
      );
      console.log("response.data =", response.data);
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/posts/post/${postId}/comments/${commentId}`, {
        withCredentials: true,
      });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (err) {
      console.error("Delete comment failed", err);
    }
  };

  return (
    <div className="post-content">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="post">
            <div className="content-container">
              <div className="avatar-container">
                {post?.User?.avatar_url ? (
                  <img src={post.User.avatar_url} alt="User avatar" />
                ) : (
                  <IoPersonOutline className="fallback-avatar" />
                )}
              </div>
              <div className="content">
                <h3>
                  {post?.User?.name} <span>{post?.User?.username}</span>
                </h3>
                <p>{post?.content}</p>
                {post?.image_url && (
                  <div className="image-container">
                    <img src={post?.image_url} alt="Post" />
                  </div>
                )}
              </div>
            </div>

            <div className="post-buttons">
              <IoChatbubbleOutline className="icon" />
              <IoHeartOutline className="icon" />
            </div>

            <div className="post-action">
              <div className="avatar-container">
                {post?.User?.avatar_url ? (
                  <img src={post.User.avatar_url} alt="User avatar" />
                ) : (
                  <IoPersonOutline className="fallback-avatar" />
                )}
              </div>
              <input
                type="text"
                placeholder="Post your reply"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={() => handleComment(post.id)}>Reply</button>
            </div>
          </div>

          {comments?.length > 0 &&
            comments.map((comment) => (
              <>
                <div className="comment" key={comment.id}>
                  <div className="avatar-container">
                    {comment?.author?.avatar_url ? (
                      <img src={comment.author.avatar_url} alt="User avatar" />
                    ) : (
                      <IoPersonOutline className="fallback-avatar" />
                    )}
                  </div>
                  <div className="content">
                    <h3>
                      {comment?.author?.name}
                      <span>{comment?.author?.username}</span>
                    </h3>
                    <p>{comment.content}</p>
                  </div>

                  {comment?.author?.id === authState.userId && (
                    <div className="delete">
                      <button
                        className="delete-button"
                        onClick={() => deleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </>
            ))}
        </>
      )}
    </div>
  );
};

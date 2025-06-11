import React, { useState } from "react";
import axios from "../config/axiosConfig";
import "./CommentModal.css";

export const CommentModal = ({ postId, onClose }) => {
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      await axios.post(
        `/posts/post/${postId}/comments`,
        { content: newComment },
        { withCredentials: true }
      );
      setNewComment("");
      setSubmitting(false);
      onClose(); // Close modal after posting
    } catch (err) {
      console.error("Failed to post comment", err);
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h3>Add a Comment</h3>
        <div className="comment-input">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handlePostComment} disabled={submitting}>
            {submitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

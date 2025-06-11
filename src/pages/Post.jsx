import React from "react";
import "./styles/Post.css";
import { HomeSidebar } from "../components/HomeSidebar";
import { PostContent } from "../components/PostContent";

export const Post = () => {
  return (
    <div className="post-component">
      <HomeSidebar />
      <PostContent />
    </div>
  );
};

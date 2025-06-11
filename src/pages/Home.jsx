import React from "react";
import { HomeSidebar } from "../components/HomeSidebar";
import "./styles/Home.css";
import { HomeContent } from "../components/HomeContent";

export const Home = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <HomeContent />
    </div>
  );
};

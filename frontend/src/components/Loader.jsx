import React from "react";
import batrang from "../assets/images/logo2.png";
import "../styles/Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={batrang} alt="" />
      </div>
    </div>
  );
};

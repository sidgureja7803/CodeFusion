import React from "react";
import "../styles/Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="code-fusion-logo">
          <div className="logo-text">
            <span className="code">Code</span>
            <span className="fusion">Fusion</span>
          </div>
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

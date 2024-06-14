// ProgressBar.js
import React from 'react';
import './progressBar.css'; // Import your CSS file

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-container mt-[2rem]">
      <div className="progress-bar" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;

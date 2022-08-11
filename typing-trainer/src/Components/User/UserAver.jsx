import { useState } from "react";

const UserAver = ({ totalGames, wordsPerMin }) => {
  return (
    <div className="average">
      <div className="average-bar">
        <div className="average-section">
          <p>Total Played</p>
          <p>{totalGames}</p>
        </div>
        <div className="average-section">
          <p>Average words per min</p>
          <p>{wordsPerMin.toFixed(2)} W/M</p>
        </div>
        <div className="average-section">
          <p>Most frequent difficulty</p>
          <p>Easy</p>
        </div>
      </div>
    </div>
  );
};

export default UserAver;

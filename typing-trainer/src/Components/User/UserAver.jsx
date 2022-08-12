import { useState, useEffect } from "react";

const UserAver = ({ exercisesData }) => {
  let wpmAverage = 0;

  exercisesData.forEach((exercise) => {
    wpmAverage += parseInt(exercise.wpm);
  });
  return (
    <div className="average">
      <div className="average-bar">
        <div className="average-section">
          <p>Total Played</p>
          <p>{exercisesData.length}</p>
        </div>
        <div className="average-section">
          <p>Average words per min</p>
          <p>{wpmAverage / exercisesData.length.toFixed(2)} W/M</p>
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

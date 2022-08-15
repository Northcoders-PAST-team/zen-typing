import { useState, useEffect } from "react";

const UserAver = ({ exercisesData }) => {
  let wpmAverage = 0;
  let accuracyAverage =0;
  let easy =0;
  let medium=0;
  let hard=0;

  exercisesData.forEach((exercise) => {
    wpmAverage += parseInt(exercise.wpm);
    accuracyAverage+= exercise.accuracy;
    exercise.difficulty === "easy" ? easy++ : 
    exercise.difficulty === "medium" ? medium++: 
    hard++;
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
          <p>{wpmAverage / exercisesData.length.toFixed(0)} W/M</p>
        </div>
        <div className="average-section">
          <p>Most frequent difficulty</p>
          <p>{easy > medium && easy > hard? "Easy" : medium > easy && medium > hard? "Medium" : "Hard"}</p>
        </div>
        <div className="average-section">
          <p>Accuracy</p>
          <p>{((accuracyAverage*100)/exercisesData.length).toFixed(2)} %</p>
        </div>
      </div>
    </div>
  );
};

export default UserAver;

import React from "react";
import UserInfoCard from "./UserInfoCard";
import "./User.scss";
import UserAver from "./UserAver";
import Graph from "./Graph";

const User = () => {
  const user = {
    userName: "DAVE2022",
    friendList: ["friend1", "friend2", "friend3"],
    loggedIn: true,
    totalGames: 20,
    wordsPerMin: 35.543,
    wordsPerMinData: [
      [1, 40.67],
      [2, 30.69],
      [3, 50.36],
      [4, 60.3],
      [5, 70.43],
    ],
    difficulty: [
      "easy",
      "hard",
      "easy",
      "medium",
      "easy",
      "hard",
      "easy",
      "medium",
    ],
  };
  return (
    <div className="user">
      <UserInfoCard
        userName={user.userName}
        friendList={user.friendList}
        loggedIn={user.loggedIn}
      />
      <UserAver totalGames={user.totalGames} wordsPerMin={user.wordsPerMin} />
      <Graph
        wordsPerMinData={user.wordsPerMinData}
        difficulty={user.difficulty}
      />
    </div>
  );
};

export default User;

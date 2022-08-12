import React from "react";
import UserInfoCard from "./UserInfoCard";
import "./User.scss";
import UserAver from "./UserAver";
import Graph from "./Graph";
import { useParams } from "react-router-dom";
import "firebase/compat/firestore";
import { db } from "../../firebaseConfig";
import { collection, orderBy, limit, query } from "firebase/firestore";

const User = ({ auth }) => {
  const { username } = useParams();

  console.log(username);
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

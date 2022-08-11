import React, { useEffect, useState } from "react";
import UserInfoCard from "./UserInfoCard";
import "./User.scss";
import UserAver from "./UserAver";
import Graph from "./Graph";
import { db } from "../../firebaseConfig";

import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";

import { UserContext } from "../User/UserContext";
import { useContext } from "react";

const User = () => {
  const { user, auth } = useContext(UserContext);
  const { user_id } = useParams();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const usersRef = doc(db, "users", user_id);

    onSnapshot(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData({ ...snapshot.data() });
      } else {
        console.log("User does not exist (profile)");
      }
    });
  }, [user_id]);

  const profile = {
    userName: userData.userName,
    friendList: userData.friends,
    loggedIn: userData.online,
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

  // const user = {
  //   userName: "DAVE2022",
  //   friendList: ["friend1", "friend2", "friend3"],
  //   loggedIn: true,
  //   totalGames: 20,
  //   wordsPerMin: 35.543,
  //   wordsPerMinData: [
  //     [1, 40.67],
  //     [2, 30.69],
  //     [3, 50.36],
  //     [4, 60.3],
  //     [5, 70.43],
  //   ],
  //   difficulty: [
  //     "easy",
  //     "hard",
  //     "easy",
  //     "medium",
  //     "easy",
  //     "hard",
  //     "easy",
  //     "medium",
  //   ],
  // };
  return (
    <div className="user">
      <UserInfoCard
        userName={profile.userName}
        friendList={profile.friendList}
        loggedIn={profile.loggedIn}
        auth={auth}
        avatar={userData.avatar}
      />
      <UserAver
        totalGames={profile.totalGames}
        wordsPerMin={profile.wordsPerMin}
      />
      <Graph
        wordsPerMinData={profile.wordsPerMinData}
        difficulty={profile.difficulty}
      />
    </div>
  );
};

export default User;

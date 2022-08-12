import React, { useEffect, useState, useContext } from "react";
import UserInfoCard from "./UserInfoCard";
import "./User.scss";
import UserAver from "./UserAver";
import Graph from "./Graph";
import "firebase/compat/firestore";
import { db } from "../../firebaseConfig";
import {
  collection,
  orderBy,
  limit,
  query,
  doc,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { UserContext } from "../User/UserContext";
import { useCollectionData } from "react-firebase-hooks/firestore";

const User = () => {
  const { user, auth } = useContext(UserContext);

  const { user_id } = useParams();

  const [userData, setUserData] = useState({});
  const [exercisesData, setExercisesData] = useState([]);
  console.log(exercisesData);
  const [error, setError] = useState(null);

  useEffect(() => {
    const usersRef = doc(db, "users", user_id);

    onSnapshot(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData({ ...snapshot.data() });
        setError(null);
      } else {
        console.log("User does not exist (profile)");
        setError("400 sorry user profile does not exist");
      }
    });
  }, [user_id]);

  useEffect(() => {
    const exercisesRef = doc(db, "exercises", user_id);

    onSnapshot(exercisesRef, (snapshot) => {
      if (snapshot.exists()) {
        setExercisesData([...snapshot.data()]);
        setError(null);
      } else {
        console.log(snapshot);
        console.log("User does not exist (profile)");
        setError("400 no data found");
      }
    });
  }, [user_id]);

  const profile = {
    userName: userData.displayName,
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

  if (error) {
    return <p>{error}</p>;
  } else {
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
  }
};

export default User;

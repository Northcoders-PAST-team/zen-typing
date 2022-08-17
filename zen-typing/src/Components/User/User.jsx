import React, { useEffect, useState, useContext } from "react";
import UserInfoCard from "./UserInfoCard";
import "./User.scss";
import UserAver from "./UserAver";
import Graph from "./Graph";
import "firebase/compat/firestore";
import { db } from "../../firebaseConfig";
import SideNav from "../SideNav/SideNav";
import {
  collection,
  doc,
  onSnapshot,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import Loading from "../Loading/Loading";

const User = () => {
  const { user, auth } = useContext(UserContext);

  const { user_id } = useParams();
  const exercisesRef = collection(db, "exercises");

  const [userData, setUserData] = useState({});
  const [exercisesData, setExercisesData] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const data = await getDocs(q);
    setExercisesData(
      data.docs.map((item) => {
        return { ...item.data() };
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    const usersRef = doc(db, "users", user_id);

    onSnapshot(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData({ ...snapshot.data() });
        getData();
        setError(null);
      } else {
        console.log("User does not exist (profile)");
        setLoading(false);
        setError("400 sorry user profile does not exist");
      }
    });
  }, [user_id]);

  const q = query(
    exercisesRef,
    where("uid", "==", user_id),
    orderBy("createdAt")
  );

  const profile = {
    userName: userData.displayName || user.email,
    friendList: userData.friends,
    loggedIn: userData.online,
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <div className="user">
      <div className="side-nav">
        <SideNav />
      </div>
      <UserInfoCard
        userName={profile.userName}
        friendList={profile.friendList}
        loggedIn={profile.loggedIn}
        auth={auth}
        avatar={userData.avatar}
      />
      <UserAver exercisesData={exercisesData} />
      <Graph exercisesData={exercisesData} />
    </div>
  );
};

export default User;

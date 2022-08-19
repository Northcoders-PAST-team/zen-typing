import SideNav from "../SideNav/SideNav";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import Loading from "../Loading/Loading";
import { db } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import "./Users.scss";
import Avatar from "../../images/avatar.webp";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersRef = collection(db, "users");

  const getData = async () => {
    const data = await getDocs(usersRef);
    setUsers(
      data.docs.map((item) => {
        return { ...item.data() };
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData()
      .then(() => {
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  console.log(users);
  return loading ? (
    <Loading />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <div>
      <SideNav />
      <section className="users">
        {users.map((user) => {
          return (
            <Link
              key={`${user.email}`}
              to={`/users/${user.id}`}
              className="users-card"
            >
              <img
                src={user.avatar !== null ? user.avatar : Avatar}
                alt=""
                className="users-Avatar"
              />

              <p className="users-displayname">{user.displayName} </p>
              <div className={user.online ? "online" : "offline"}></div>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Users;

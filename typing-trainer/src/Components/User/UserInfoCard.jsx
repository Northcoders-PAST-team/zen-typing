import { useState } from "react";
import Avatar from "../../images/avatar.webp";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const UserInfoCard = ({
  userName,
  friendList,
  loggedIn,
  auth,
  avatar,
  setEdit,
  user,
}) => {
  const [isDelete, setDelete] = useState(false);

  return (
    <div className="user-InfoCard">
      {avatar ? (
        <img src={avatar} alt="" className="user-avatar" />
      ) : (
        <img src={Avatar} alt="" className="user-avatar" />
      )}

      <div className="user-options">
        <p className="username">
          {user.displayName}{" "}
          <span className={loggedIn ? "online" : "offline"}></span>
        </p>
        {auth.currentUser ? (
          <div>
            <Button
              variant="contained"
              size="large"
              startIcon={<BorderColorIcon />}
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit Profile
            </Button>
            {!isDelete ? (
              <Button
                className="btn"
                variant="contained"
                color="error"
                onClick={() => {
                  setDelete(true);
                }}
                startIcon={<DeleteIcon />}
                size="large"
              >
                Delete profile
              </Button>
            ) : (
              <div>
                <p className="user-option-question">Are you sure?</p>
                <Button variant="contained" color="success">
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setDelete(false);
                  }}
                >
                  No
                </Button>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div className="user-friends">
        <table className="user-table">
          <thead>
            <tr>
              <th>Friends</th>
            </tr>
          </thead>
          <tbody>
            {friendList !== undefined ? (
              <td>
                {friendList.map((friend) => {
                  return (
                    <tr key={friend}>
                      <td>{friend}</td>
                    </tr>
                  );
                })}
              </td>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfoCard;

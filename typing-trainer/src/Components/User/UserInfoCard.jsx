import { useState } from "react";
import Avatar from "../../images/avatar.webp";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const UserInfoCard = ({ userName, friendList, loggedIn }) => {
  const [isDelete, setDelete] = useState(false);

  return (
    <div className="user-InfoCard">
      <img src={Avatar} alt="" className="user-avatar" />
      <div className="user-options">
        <p className="username">
          {userName} <span className={loggedIn ? "online" : "offline"}></span>
        </p>
        <Button
          variant="contained"
          size="large"
          startIcon={<BorderColorIcon />}
        >
          Edit Profile
        </Button>
        {!isDelete ? (
          <Button
            variant="outlined"
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
      <div className="user-friends">
        <table className="user-table">
          <thead>
            <tr>
              <th>Friends</th>
            </tr>
          </thead>
          <tbody>
            {friendList.map((friend) => {
              return (
                <tr key={friend}>
                  <td>{friend}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfoCard;

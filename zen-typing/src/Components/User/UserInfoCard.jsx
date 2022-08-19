import Avatar from "../../images/avatar.webp";
const UserInfoCard = ({ userName, friendList, loggedIn, auth, avatar }) => {
  return (
    <div className="user-InfoCard">
      {avatar ? (
        <img src={avatar} alt="" className="user-avatar" />
      ) : (
        <img src={Avatar} alt="" className="user-avatar" />
      )}

      <div className="user-options">
        <p className="username">
          {userName} <span className={loggedIn ? "online" : "offline"}></span>
        </p>
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

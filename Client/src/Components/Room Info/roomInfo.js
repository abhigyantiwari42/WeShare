import React from "react";
import onlineLogo from "../../Images/online.png";
import "../Room Info/roomInfo.css";

const RoomInfo = ({ roomMembers }) => {
  return (
    <div id="roomInfoContainer">
      <h2>Room Members</h2>
      {roomMembers.length !== 0 ? (
        <div>
          {roomMembers.map((user, index) => {
            return (
              <div key={index} className="users">
                <img src={onlineLogo} alt="online" />
                <p>{user.userName}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <h4>No Users</h4>
      )}
    </div>
  );
};

export default RoomInfo;

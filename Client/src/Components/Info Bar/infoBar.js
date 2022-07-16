import React from "react";
import onlineLogo from "../../Images/online.png";
import closeLogo from "../../Images/close.png";
import participantsLogo from "../../Images/participants.png";
import signOutLogo from "../../Images/signOut.png";

import "../Info Bar/infoBar.css";

const InfoBar = ({ roomName }) => {
  const showParticipants = () => {
    const members = document.getElementById("members");
    members.style.display = "flex";
    members.style.animationDirection = "forwards";
    members.style.animationPlayState = "running";
  };
  return (
    <div id="infoBar">
      <div id="info">
        <img src={onlineLogo} alt="Online" />
        <h2 id="roomName">{roomName}</h2>
      </div>
      <a href="/" id="closeBtn">
        <img src={closeLogo} alt="Close" />
      </a>
      <div id="mobileActions">
        <span>
          <a href="/">
            <img src={signOutLogo} alt="Close" />
          </a>
        </span>
        <span onClick={showParticipants} id="participantsClick">
          <img src={participantsLogo} alt="Participants" />
        </span>
      </div>
    </div>
  );
};

export default InfoBar;

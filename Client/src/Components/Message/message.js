import React from "react";
import ReactEmoji from "react-emoji";

import "../Message/message.css";

const Message = ({ message: { user, text, time }, userName }) => {
  if (user === userName.trim()) {
    user = "You";
  }

  let className;
  if (user === "WeShare") {
    className = "admin";
  } else if (user === "You") {
    className = "right";
  } else {
    className = "left";
  }

  return (
    <div className={className} id="message">
      <div id="msg">
        <p id="user">{user}</p>
        <p id="textMsg">{ReactEmoji.emojify(text)}</p>
        <p id="time">{time}</p>
      </div>
    </div>
  );
};

export default Message;

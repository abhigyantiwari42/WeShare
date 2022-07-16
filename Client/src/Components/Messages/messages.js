import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/message";

import "../Messages/messages.css";

const Messages = ({ messages, userName }) => {
  return (
    <ScrollToBottom className="messageContainer">
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <Message message={message} userName={userName} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;

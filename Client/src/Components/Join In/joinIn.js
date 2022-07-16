import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import signInLogo from "../../Images/signIn.png";
import "../Join In/joinIn.css";

const JoinIn = () => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const joinInForm = () => {
    const warning = () => {
      return <div>Username and roomname should be of 4 characters</div>;
    };

    return (
      <div id="formContainer">
        <h1>Join In</h1>
        <form autoComplete="off" className="form">
          <label for="username"></label>
          <input
            placeholder="Username"
            id="username"
            value={userName}
            autoFocus="on"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />

          <label for="room"></label>
          <input
            placeholder="Room"
            id="room"
            value={roomName}
            onChange={(event) => {
              setRoomName(event.target.value);
            }}
          />

          <Link
            onClick={(e) =>
              userName.length < 4 || roomName.length < 4
                ? e.preventDefault()
                : null
            }
            to={`/chatPage?userName=${userName}&roomName=${roomName}`}
            id="link"
          >
            <button>
              <img src={signInLogo} alt="SignIn" />
              <p>Join In</p>
            </button>
          </Link>
        </form>
        <h4 className="warning">
          *Username and room should be of at least 4 characters
        </h4>
      </div>
    );
  };

  return (
    <div>
      <div id="topRight"></div>
      <div className="welcome">
        <div id="slider">
          <h1>Welcome to WeShare!</h1>
          <h1>A Realtime Web-chat Application built</h1>
          <h1>with ReactJS, ExpressJS, NodeJS and SocketIO ❤️</h1>
        </div>
        <div id="mobile">
          <h1>Welcome to</h1>
          <h1>WeShare!</h1>
        </div>
      </div>
      <div id="joinIn">{joinInForm()}</div>
      <div id="bottomLeft"></div>
    </div>
  );
};

export default JoinIn;

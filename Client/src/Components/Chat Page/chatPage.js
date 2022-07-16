import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import InfoBar from "../Info Bar/infoBar";
import Messages from "../Messages/messages";
import RoomInfo from "../Room Info/roomInfo";
import { Redirect, useHistory } from "react-router";
import sendLogo from "../../Images/send.png";
import participantsLogo from "../../Images/participants.png";
import signOutLogo from "../../Images/signOut.png";
import backLogo from "../../Images/back.png";
import darkModeLogo from "../../Images/darkMode.png";
import lightModeLogo from "../../Images/lightMode.png";

import "../Chat Page/chatPage.css";

let socket;
const ENDPOINT = "https://we-share-chat-app.herokuapp.com/";

const ChatPage = ({ location }) => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);

  let history = useHistory();

  useEffect(() => {
    const { userName, roomName } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setUserName(userName);
    setRoomName(roomName);

    socket.emit("joined", { userName, roomName }, (error) => {
      if (error) {
        alert(error);
        history.push("/joinIn");
      }
    });

    return () => {
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("messageArrived", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomInfo", ({ roomUsers }) => {
      setRoomMembers(roomUsers);
    });
  }, [ENDPOINT]);

  const inputField = () => {
    return (
      <form autoComplete="off" className="form">
        <input
          autoFocus="on"
          id="mainTyping"
          type="text"
          placeholder="Type message"
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button onClick={sendMessage} type="submit">
          <img src={sendLogo} alt="Send" />
          {/* <p>Send</p> */}
        </button>
      </form>
    );
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("messageSending", {
        message: { user: userName, text: message },
      });
    }

    document.getElementById("mainTyping").value = "";
    setMessage("");
  };

  const showParticipants = () => {
    const members = document.getElementById("members");
    members.style.display = "flex";
    members.style.animationDirection = "forwards";
    members.style.animationPlayState = "running";
  };

  const removeParticipants = () => {
    const members = document.getElementById("members");
    members.style.display = "none";
    members.style.left = "-51%";
  };

  const lightModeBtn = document.getElementById("lightMode");
  const darkModeBtn = document.getElementById("darkMode");
  const chatHere = document.getElementById("chatHere");

  const darkMode = () => {
    lightModeBtn.style.display = "block";
    darkModeBtn.style.display = "none";
    chatHere.style.backgroundColor = "#1a1a1d";
  };

  const lightMode = () => {
    darkModeBtn.style.display = "block";
    lightModeBtn.style.display = "none";
    chatHere.style.backgroundColor = "white";
  };

  return (
    <div id="chatPage">
      <h1>WeShare</h1>
      <div id="mainChatWindow">
        <div id="members">
          {roomMembers.length !== 0 ? (
            <RoomInfo roomMembers={roomMembers} />
          ) : null}
          <div id="actionButtons">
            <button onClick={removeParticipants}>
              <img src={backLogo} alt="Back" />
              <p>Back</p>
            </button>
            <div id="modes">
              <button id="darkMode" onClick={darkMode}>
                <img src={darkModeLogo} alt="Back" />
              </button>
              <button id="lightMode" onClick={lightMode}>
                <img src={lightModeLogo} alt="Back" />
              </button>
            </div>
          </div>
        </div>
        <div id="chatHere">
          <InfoBar roomName={roomName} />
          <Messages messages={messages} userName={userName} />
          <form autoComplete="off" className="form">
            <input
              autoFocus="on"
              id="mainTyping"
              type="text"
              placeholder="Type message"
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <button onClick={sendMessage} type="submit">
              <img src={sendLogo} alt="Send" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

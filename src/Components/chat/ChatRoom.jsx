import React, { useEffect, useRef, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import "./chat.css";
import { getUserDetails } from "../../Api/User";
import { getAllChatMessages } from "./chatApi";
import { Button, Input } from "@mui/material";
import { Close, Refresh, Send, TimeToLeaveOutlined } from "@mui/icons-material";
var stompClient = null;
const ChatRoom = () => {
  const [publicChats, setPublicChats] = useState([
    {
      messageId: "",
      status: "",
      date: "",
      message: "",
      chatMember: {
        chatMemberId: "",
        fullName: "",
        profile_url: "",
        connected: "",
      },
    },
  ]);
  const [tab, setTab] = useState("CHATROOM");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [connected, setConnected] = useState(false);
  const sendMessageRef = useRef(null);
  const scrollRef = useRef(null);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    profile_image_path: "",
    joinDate: "",
    isEmailVerified: "",
    isBlocked: "",
    role: "",
  });

  const fetchUserDetails = async () => {
    const userDetailsResponse = await getUserDetails();
    console.log(userDetailsResponse.data, "from here");
    const data = userDetailsResponse.data;
    setUserDetails({
      userId: data.userId,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      profile_image_path: data.profile_image_path,
      joinDate: data.joinDate,
      isEmailVerified: data.isEmailVerified,
      isBlocked: data.isBlocked,
      role: data.role,
      chatOnline: data.chatOnline,
    });
    setProfilePic(`${data.profile_image_path}`);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUserDetails();
      console.log(userDetails);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getAllChatMessages();
      console.log(response);
      setPublicChats(response);
    } catch (error) {}
  };

  const focusInput = () => {
    if (sendMessageRef.current) {
      sendMessageRef.current.focus();
    }
  };

  const scrollBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop;
    }
  };

  const connect = () => {
    let Sock = new SockJS("https://chat.planb-ajithkrkd.online/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    Sock.onclose({},disconnect)
  };

  const disconnect = () => {
    "disconnected --------------------------------------"
  }

  const onConnected = () => {
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    userJoin();
    setConnected(true);
    console.log("here connected");
  };

  const userJoin = () => {
    var Message = {
      chatMember: {
        chatMemberId: userDetails.userId,
        fullName: userDetails.fullName,
        profile_url: userDetails.profile_image_path,
        connected: true,
      },
      message: "joined !!",
      date: new Date(),
      status: "JOIN",
    };
    stompClient.send("/app/chat/join", {}, JSON.stringify(Message));
    scrollBottom();
    focusInput();
  };

  const userLeave = () => {
    var Message = {
      chatMember: {
        chatMemberId: userDetails.userId,
        fullName: userDetails.fullName,
        profile_url: userDetails.profile_image_path,
        connected: false,
      },
      message: "left the chat",
      date: new Date(),
      status: "LEAVE",
    };
    stompClient.send("/app/chat/leave", {}, JSON.stringify(Message));
    setConnected(false);
  };

  const reconnect = () => {
    connect();
  }

  const leaveFromChat = () => {
    userLeave();
  }
  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      case "LEAVE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats])
        break;
    }
    scrollBottom();
    focusInput();
  };

  const onError = (err) => {
    console.log(err);
    if (err.message.includes("DISCONNECTED")) {
      console.log("Socket Disconnected!");
      setConnected(false);
      userLeave();
    } else {
      console.log("Other error:", err);
    }
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setEnteredMessage(value);
  };

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        chatMember: {
          chatMemberId: userDetails.userId,
          fullName: userDetails.fullName,
          profile_url: userDetails.profile_image_path,
          connected:true
        },
        message: enteredMessage,
        date: new Date(),
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setEnteredMessage("");
      scrollBottom();
      focusInput();
    }
  };

  const getTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const messageTime = new Date(timestamp);
    const differenceInMilliseconds = currentTime - messageTime;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);

    if (differenceInHours > 0) {
      return `${differenceInHours} ${
        differenceInHours === 1 ? "hour" : "hours"
      } ago`;
    } else if (differenceInMinutes > 0) {
      return `${differenceInMinutes} ${
        differenceInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    } else {
      return "Just now";
    }
  };

  const registerUser = () => {
    connect();
  };

  return (
    <div class="container project-container">
      {connected ? (
        <div class="chat-box">
          {tab === "CHATROOM" && (
            <div class="chat-content" >
              <div className="flex justify-between my-2">
             <p className="text-left font-semibold text-2xl">PLAN-B COMMUNITY</p>
             <div className="flex gap-3">
              <Button onClick={reconnect} variant="contained" color="success"><Refresh/>Reconnect</Button>
              <Button onClick={leaveFromChat} variant="contained" color="error"><Close/> LEAVE</Button>
             </div>
              </div>
              <ul className="chat-messages" ref={scrollRef}>
  {publicChats.map((chat, index) => (
    <li
      className={`message flex items-center ${
        chat.chatMember.fullName === userDetails.fullName && "self"
      }`}
      key={index}
    >
      {/* Show JOIN and LEAVE messages conditionally */}
      {(chat.status === "JOIN" || chat.status === "LEAVE") && (
        <div className="italic text-gray-500 mb-2 center-message">
          {chat.chatMember.fullName === userDetails.fullName ? (
            <span>{chat.status === "JOIN" ? "You joined the chat" : "You left the chat"}</span>
          ) : (
            <span>{chat.chatMember.fullName} {chat.status === "JOIN" ? "joined the chat" : "left the chat"}</span>
          )}
        </div>
      )}
      {/* Only show message content for non-JOIN and non-LEAVE messages */}
      {chat.status !== "JOIN" && chat.status !== "LEAVE" && (
        <div
          className={`rounded-lg p-2 ${
            chat.chatMember.fullName !== userDetails.fullName
              ? "bg-blue-200"
              : "bg-green-200"
          }`}
          style={{ minWidth: 200 }}
        >
          {chat.chatMember.fullName !== userDetails.fullName && (
            <div
              className="font-semibold text-blue-900 mb-1"
              style={{ fontSize: 12 }}
            >
              {chat.chatMember.fullName}
            </div>
          )}
          <p
            className={`italic ${
              chat.chatMember.fullName !== userDetails.fullName
                ? "text-blue-900 font-semibold"
                : "text-green-900 font-normal"
            }`}
          >
            {chat.status === "MESSAGE" && chat.message}
          </p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-gray-500">
              {getTimeDifference(chat.date)}
            </p>
          </div>
        </div>
      )}
    </li>
  ))}
</ul>


              <div class="send-message mt-3">
                <Input
                  fullWidth
                  type="text"
                  inputRef={sendMessageRef}
                  class="input-message"
                  placeholder="enter the message"
                  value={enteredMessage}
                  onChange={handleMessage}
                />
                <Button variant="contained" onClick={sendValue}>
                  send <Send />
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
            <img
              src={userDetails.profile_image_path}
              alt="Profile"
              className="mx-auto h-20 mb-4 rounded-full"
              style={{width:110,height:100}}
            />
            <h2 className="text-2xl mb-4 text-center">
              Do you want to join the chat?
            </h2>
            <input
              id="user-name"
              placeholder="Enter your name"
              name="userName"
              value={userDetails.fullName}
              className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={registerUser}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;

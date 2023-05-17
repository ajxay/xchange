import React, { useState, useRef, useEffect } from "react";

import { getOrCreateChat } from "./getOrCreateChat";

import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";

const Chat = (props) => {
  console.log(props.seller, "seller");
  const projectID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;
  const { result } = JSON.parse(localStorage.getItem("profile"));
  const currentUser = result;

  const didMountRef = useRef(false);
  const [chat, setChat] = useState(null);
  const [headers, setHeaders] = useState({
    "Project-ID": projectID,
    "User-Name": currentUser.username,
    "User-Secret": currentUser.email,
  });

  // useEffect(() => {
  //   if (!didMountRef.current) {
  //     didMountRef.current = true;
  //     const data = {
  //       usernames: [currentUser.username, props.seller.username],
  //       is_direct_chat: true,
  //     };
  //     getOrCreateChat(headers, data, (chat) => setChat(chat));
  //   }
  // });
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      const data = {
        usernames: [currentUser.username, props.seller.username],
        is_direct_chat: true,
      };
      getOrCreateChat(headers, data, (chat) => {
        setChat(chat);
        const messageData = {
          text: "Hello, how can I help you?",
          sender_username: currentUser.username,
        };
        chat.postMessage(messageData, (message) => console.log(message));
      });
    }
  });

  if (chat === null) return <div />;

  return (
    <div style={{ width: "100%" }}>
      <ChatEngineWrapper>
        <Socket
          projectID={headers["Project-ID"]}
          userName={headers["User-Name"]}
          userSecret={headers["User-Secret"]}
        />

        <ChatFeed activeChat={chat.id} />
      </ChatEngineWrapper>
    </div>
  );
};

export default Chat;

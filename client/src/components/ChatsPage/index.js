import React from "react";

import { ChatEngine } from "react-chat-engine";

const ChatsPage = () => {
  const { result } = JSON.parse(localStorage.getItem("profile"));
  const projectID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;
  console.log(result.username, result.email, projectID, "creds");

  return (
    <div>
      {
        // You need the creds correct before rendering Chat Engine
        result.username && result.email && (
          <ChatEngine
            height="calc(90vh - 64px)"
            projectID={projectID}
            userName={result.username}
            userSecret={result.email}
          />
        )
      }
    </div>
  );
};

export default ChatsPage;

import React from "react";

import { ChatEngine } from "react-chat-engine";

const ChatsPage = () => {
  const { result } = JSON.parse(localStorage.getItem("profile"));
  const projectID = "6e702d58-f4d3-442b-a5df-472f7078dd46";
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

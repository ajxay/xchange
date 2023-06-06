import axios from "axios";

export default async function loginChatUser(user) {
  const config = {
    method: "get",
    url: "https://api.chatengine.io/users/me",
    headers: {
      "Project-ID": "6e702d58-f4d3-442b-a5df-472f7078dd46",
      //   "Content-Type": "application/json",
      "User-Name": user.username,
      "User-secret": user.email,
    },
  };

  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.message, "error");
    });
}

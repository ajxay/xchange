import axios from "axios";

export default async function loginChatUser(user) {
  const config = {
    method: "get",
    url: "https://api.chatengine.io/users/me",
    headers: {
      "Project-ID": "9851ef2a-97da-48ab-82fc-fd7b3c92c5d2",
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

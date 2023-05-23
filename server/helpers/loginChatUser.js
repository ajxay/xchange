import axios from "axios";

export default async function loginChatUser(user) {
  const config = {
    method: "get",
    url: "https://api.chatengine.io/users/me",
    headers: {
      "Project-ID": "86388e40-d373-4ef0-a2c0-9ae00d1f89db",
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

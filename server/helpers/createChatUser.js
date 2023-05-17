import axios from "axios";

export default function createChatUser(user) {
  const data = {
    username: user.username,
    secret: user.email,
    email: user.email,
  };
  console.log(data);
  try {
    const config = {
      method: "post",
      url: "https://api.chatengine.io/users/",
      headers: {
        "PRIVATE-KEY": "faafa2e8-389c-4fa5-86f0-2e3182196681",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.message, "error");
      });
  } catch (error) {
    console.log(error);
  }
}

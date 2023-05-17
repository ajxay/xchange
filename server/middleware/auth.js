import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  console.log("reached auth");

  console.log(req.headers.Authorization, "token");

  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_KEY);

      req.userId = decodedData?.id;
      console.log(decodedData, "data");
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;

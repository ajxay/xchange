import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import openaiRoutes from "./routes/openai.js";
import swapRoutes from "./routes/swapRoutes.js";
import morgan from "morgan";

import dotenv from "dotenv";

const app = express();
dotenv.config();
morgan("combined");
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/openai", openaiRoutes);
app.use("/api/swap", swapRoutes);

const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.msg);
  });

//   memongoose.set('useFindAndModify', false);

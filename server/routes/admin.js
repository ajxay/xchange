import express from "express";
import {
  signin,
  getUsers,
  deactivateUser,
  disablePost,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/signin", signin);
router.get("/users", getUsers);
router.patch("/users/:id/deactivate", deactivateUser);
router.patch("/posts/:id/disable", disablePost);

export default router;

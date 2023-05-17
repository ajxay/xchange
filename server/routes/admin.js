import express from "express";
import { signin, getUsers, deactivateUser } from "../controllers/admin.js";

const router = express.Router();

router.post("/signin", signin);
router.get("/users", getUsers);
router.patch("/users/:id/deactivate", deactivateUser);

export default router;

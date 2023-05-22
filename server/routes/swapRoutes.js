import express from "express";
import {
  createRequest,
  getRequest,
  acceptRequest,
  declineRequest,
  getAllRequest,
} from "../controllers/swap.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createRequest);
router.get("/", auth, getRequest);
router.get("/accept", auth, acceptRequest);
router.get("/decline/:id", auth, declineRequest);
router.get("/requests", auth, getAllRequest);

export default router;

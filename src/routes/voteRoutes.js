import { Router } from "express";
import { postVote } from "../controllers/voteControllers.js";

const router = Router();

router.post("/choice/:id/vote", postVote);

export default router;
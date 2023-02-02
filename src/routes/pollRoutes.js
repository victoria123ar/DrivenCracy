import { Router } from "express";
import { postPoll, getPoll } from "../controllers/pollControllers.js";

const router = Router();

router.post("/poll", postPoll);
router.get("/poll", getPoll);

export default router;
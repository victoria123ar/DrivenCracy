import { Router } from "express";
import { postChoice, getChoice } from "../controllers/choiceControllers.js";

const router = Router();

router.post("/choice", postChoice);
router.get("/poll/:id/choice", getChoice);

export default router;
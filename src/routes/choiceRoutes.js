import { Router } from "express";
import { postChoice } from "../controllers/choiceControllers.js";

const router = Router();

router.post("/choice", postChoice);

export default router;
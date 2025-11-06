import { Router } from "express";
import { login, signUp } from "./auth.controller";

const router = Router();
router.post("/signup", signUp);
router.post("/signin", login);

export default router;

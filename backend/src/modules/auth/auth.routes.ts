import { Router } from "express";
import { login, refreshAccessToken, signUp } from "./auth.controller";

const router = Router();
router.post("/signup", signUp);
router.post("/signin", login);
router.post("/refresh",refreshAccessToken)

export default router;

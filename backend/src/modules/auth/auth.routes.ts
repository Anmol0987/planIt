import { Router } from "express";
import { getMe, login,logout, signUp } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.post("/signup", signUp);
router.post("/signin", login);
router.post("/logout",logout)
// router.post("/refresh",refreshAccessToken)

router.get("/me", authMiddleware, getMe);


export default router;

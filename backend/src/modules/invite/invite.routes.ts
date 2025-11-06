import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { AcceptInvite, CreateInvites,getTripInvites} from "./invite.controller";


const router = Router()
router.use(authMiddleware)
router.post('/accept',AcceptInvite)
router.post('/:tripId',CreateInvites)
router.get('/:tripId',getTripInvites)


export default router
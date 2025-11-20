import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { getPollDetailsById,voteOnPoll,deletePollById,closePollById } from "./poll.controller";

const router = Router();
router.use(authMiddleware);

router.get('/:id',getPollDetailsById)
router.post('/:id/vote',voteOnPoll)
router.delete('/:id',deletePollById)
router.patch('/:id/close',closePollById)


export default router;

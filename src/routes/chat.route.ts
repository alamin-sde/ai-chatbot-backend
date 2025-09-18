import { Router } from "express";
import { getQuickReplies } from "../controllers/chat.controller";
import { auth } from "../middleware/auth.middleware";
const router = Router();
/**
 * @swagger
 * /api/v1/chat/quick-replies:
 *  get:
 *      summary: Retrieve all quick replies
 *      tags: [Chat]
 *      responses:
 *          200:
 *              description: Secret data unlocked
 *          401:
 *              description: Unauthorized
 */
router.get("/chat/quick-replies",auth,getQuickReplies)
export default router
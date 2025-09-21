import { Router } from "express";
import { getChatHistory, getQuickReplies, sendMessage } from "../controllers/chat.controller";
import { auth } from "../middleware/auth.middleware";
import { body } from "express-validator";
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
router.get("/chat/quick-replies", auth, getQuickReplies)

/**
 * @swagger
 * /api/v1/chat/send-message:
 *   post:
 *     summary: Send a message
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hello AI"
 *               sessionId:
 *                 type: string
 *                 example: "abc123"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message sent successfully"
 *                 sessionId:
 *                   type: string
 *                   example: "abc123"
 *       400:
 *         description: Bad request (validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */

router.post("/chat/send-message", auth,[
    body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be between 1 and 2000 characters'),
    body('sessionId').optional().isString()
], sendMessage)

/**
 * @swagger
 * /api/v1/chat/chat-history:
 *   post:
 *     summary: Search chat history
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchTitle:
 *                 type: string
 *                 example: "react"
 *              
 *     responses:
 *       201:
 *         description: Message sent successfully
 *        
 */
router.post("/chat/chat-history",auth, getChatHistory)
export default router
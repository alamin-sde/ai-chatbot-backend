import { Router } from "express";
import { createUser, getUsers} from "../controllers/user.controller";
import { auth } from "../middleware/auth.middleware";
import { login } from "../controllers/auth.controller";

const router = Router();
/**
 * @swagger
 *  /api/v1/login:
 *   post:
 *     summary: user login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 username:
 *                   type: string
 *                   example: "alamin@ai.com"
 *                 password:
 *                   type: string
 *                   example: "ai@123"
 *     responses:
 *       201:
 *         description: login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "login successfully"
 *                 token:
 *                   type: string
 *                 user:
 *                     type: object
 * 
 */
router.post("/login", login)
export default router;
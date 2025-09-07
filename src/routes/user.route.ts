import { Router } from "express";
import { createUser, getUsers} from "../controllers/user.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Secret data unlocked
 *       401:
 *         description: Unauthorized
 */
router.get("/users",auth, getUsers)

/**
 * @swagger
 *  /api/v1/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 username:
 *                   type: string
 *                   example: "Alamin Islam"
 *                 email:
 *                   type: string
 *                   example: "alamin@example.com"
 *                 password:
 *                   type: string
 *                   example: "alamin@123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 token:
 *                   type: string
 *                 user:
 *                     type: object
 * 
 */
router.post("/register", createUser)
export default router;
import express from "express";
import controller from "../controllers/auth.controller";
import { authRateLimiter } from "../../middlewares/apiRateLimiter.middleware";

const router = express.Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/signup", controller.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login",authRateLimiter, controller.login);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout user (optionally from all devices)
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshTokenId]
 *             properties:
 *               refreshTokenId:
 *                 type: string
 *                 description: Refresh token from login
 *               terminateAll:
 *                 type: boolean
 *                 default: false
 *                 description: If true, logout from all devices (terminate all sessions)
 *           examples:
 *             logoutCurrent:
 *               summary: Logout from current device only
 *               value: { "refreshTokenId": "uuid-from-login" }
 *             logoutEverywhere:
 *               summary: Logout from all devices
 *               value: { "refreshTokenId": "uuid-from-login", "terminateAll": true }
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       400:
 *         description: Refresh token is required
 */
router.post("/logout", controller.logout);


export default router;

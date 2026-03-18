import express from "express";
import controller from "../controllers/authToken.controller";

const router = express.Router();

/**
 * @openapi
 * /authToken/referesh:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [AuthToken]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshTokenId]
 *             properties:
 *               refreshTokenId:
 *                 type: string
 *                 description: Refresh token from login. Must not be expired.
 *           example:
 *             refreshTokenId: "uuid-from-login"
 *     responses:
 *       200:
 *         description: New access token and refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshTokenId:
 *                   type: string
 *       401:
 *         description: Invalid, revoked, or expired refresh token. Login required.
 */
router.post("/referesh", controller.refresh);

export default router;

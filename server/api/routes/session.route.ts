import express from "express";
import controller from "../controllers/session.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

/**
 * @openapi
 * /sessions:
 *   get:
 *     summary: List active sessions for the current user
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active sessions
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, controller.list);

/**
 * @openapi
 * /sessions/terminate-all:
 *   delete:
 *     summary: Terminate all sessions for the current user
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All sessions terminated successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/terminate-all", authMiddleware, controller.terminateAll);

/**
 * @openapi
 * /sessions/{sessionId}:
 *   delete:
 *     summary: Revoke a session
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session revoked successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/:sessionId", authMiddleware, controller.revoke);

export default router;

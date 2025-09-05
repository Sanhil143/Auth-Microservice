import express from "express";
import controller from "../controllers/authToken.controller";

const router = express.Router();

/**
 * @openapi
 * /authToken/referesh:
 *   post:
 *     summary: Refresh JWT token
 *     tags: [AuthToken]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.post("/referesh", controller.refresh);

/**
 * @openapi
 * /authToken/logout:
 *   post:
 *     summary: Logout user
 *     tags: [AuthToken]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post("/logout", controller.logout);

export default router;

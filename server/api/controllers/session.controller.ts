import { Request, Response } from "express";
import SessionService from "../services/session.service";
import { AuthUser } from "../../middlewares/auth.middleware";

class SessionController {
  async list(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as Request & { user: AuthUser }).user;
      if (!user?.id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const sessions = await SessionService.listByUserId(user.id);
      res.status(200).json(sessions);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }

  async revoke(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as Request & { user: AuthUser }).user;
      const { sessionId } = req.params;

      if (!user?.id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      if (!sessionId) {
        res.status(400).json({ error: "Session ID is required" });
        return;
      }

      const result = await SessionService.revoke(sessionId, user.id);
      res.status(200).json(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }

  async terminateAll(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as Request & { user: AuthUser }).user;

      if (!user?.id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const result = await SessionService.terminateAll(user.id);
      res.status(200).json(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }
}

export default new SessionController();

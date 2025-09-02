import { Request, Response } from "express";
import AuthTokenService from "../services/authToken.service";

export class AuthTokenController {
  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshTokenId } = req.body; // client se aayega
      if (!refreshTokenId) {
        res.status(400).json({ error: "Refresh token is required" });
        return;
      }
      const tokens = await AuthTokenService.refreshToken(refreshTokenId);
      res.status(200).json(tokens);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(401).json({ error: err.message });
      } else {
        res.status(401).json({ error: "Unknown error occurred" });
      }
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { refreshTokenId } = req.body;
      if (!refreshTokenId) {
        res.status(400).json({ error: "Refresh token is required" });
        return;
      }

      const result = await AuthTokenService.logout(refreshTokenId);
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

export default new AuthTokenController();
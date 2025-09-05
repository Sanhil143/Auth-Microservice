import AuthService from "../services/auth.service";
import { Request, Response } from "express";
import { IUser } from "../../interfaces/user.interface";
import { Types } from "mongoose";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, password } = req.body;
      const user: IUser = await AuthService.register(
        email,
        name,
        password
      );

      res.status(201).json({ userId: (user._id as Types.ObjectId).toString() });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const tokens = await AuthService.login(email, password);
      res.json(tokens);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { refreshTokenId } = req.body;
      if (!refreshTokenId) {
        res.status(400).json({ error: "Refresh token is required" });
        return;
      }

      const result = await AuthService.logout(refreshTokenId);
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

export default new AuthController();

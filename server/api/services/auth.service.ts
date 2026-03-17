import { Request } from "express";
import { user } from "../../models/user.model";
import { authToken } from "../../models/authToken.model";
import { hashPassword, comparePassword } from "../../utils/hash.util";
import { signAccessToken } from "../../utils/jwt.util";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../../interfaces/user.interface";
import { Types } from "mongoose";
import { ILoginResponse } from "../../interfaces/login.interface";
import SessionService from "./session.service";
import l from "../../utils/logger.util";
import ms from "ms";

class AuthService {
  /**
   * Registers a new user with the given email, name, and password.
   * The password is hashed using bcrypt before being stored.
   * @param email - The email of the new user.
   * @param name - The name of the new user.
   * @param password - The password of the new user.
   * @returns A newly created IUser document.
   */
  async register(
    email: string,
    name: string,
    password: string
  ): Promise<IUser> {
    l.info(`${this.constructor.name}.register()`);
    const passwordHash: string = await hashPassword(password);
    password = passwordHash;
    const createUser: IUser = await user.create({
      email,
      name,
      password,
    });

    return createUser;
  }

  /**
   * Authenticates a user given their email and password.
   * If the credentials are invalid, it throws an error.
   * If the credentials are valid, it returns a new access token and a refresh token.
   * Creates a session linked to the auth token for session management.
   * @param email - The email of the user to login.
   * @param password - The password of the user to login.
   * @param req - Express request (optional, for session metadata)
   * @returns An object containing the access token and the refresh token.
   */
  async login(
    email: string,
    password: string,
    req?: Request
  ): Promise<ILoginResponse> {
    l.info(`${this.constructor.name}.login()`);
    const userData: IUser | null = await user.findOne({ email });
    if (!userData) throw new Error("Invalid credentials");
    const ok: boolean = await comparePassword(password, userData.password);
    if (!ok) throw new Error("Invalid credentials");

    const accessToken: string = signAccessToken(
      (userData._id as Types.ObjectId).toString(),
      userData.tokenVersion
    );

    const refreshId: string = uuidv4();
    const expiresInStr = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";
    const expiresMs = ms(expiresInStr as ms.StringValue);

    const tokenDoc = await authToken.create({
      tokenId: refreshId,
      userId: userData._id,
      expiresAt: new Date(Date.now() + expiresMs),
      revoked: false,
    });

    if (req) {
      await SessionService.create(
        userData._id as Types.ObjectId,
        tokenDoc._id as Types.ObjectId,
        req,
        expiresInStr
      );
    }

    return { accessToken, refreshTokenId: refreshId };
  }

  /**
   * Revokes a refresh token, effectively logging out the user.
   * @param refreshTokenId - The ID of the refresh token to revoke.
   * @returns An object indicating the success of the operation and a message.
   */
  async logout(
    refreshTokenId: string
  ): Promise<{ status: boolean; message?: string }> {
    l.info(`${this.constructor.name}.logout()`);
    const tokenDoc = await authToken.findOne({ tokenId: refreshTokenId });
    if (tokenDoc) {
      tokenDoc.revoked = true;
      await tokenDoc.save();
    }
    return { status: true, message: "logout successfully" };
  }
}

export default new AuthService();

import { user } from "../../models/user.model";
import { authToken } from "../../models/authToken.model";
import { hashPassword, comparePassword } from "../../utils/hash.util";
import { signAccessToken } from "../../utils/jwt.util";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../../interfaces/user.interface";
import { Types } from "mongoose";
import { ILoginResponse } from "../../interfaces/login.interface";
import l from "../../utils/logger.util";

class AuthService {
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

  async login(email: string, password: string): Promise<ILoginResponse> {
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

    await authToken.create({
      tokenId: refreshId,
      userId: userData._id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      revoked: false,
    });

    return { accessToken, refreshTokenId: refreshId };
  }
}

export default new AuthService();

import bcrypt from "bcrypt";

import { AuthRepository } from "../repositories/auth.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { generateAccessToken } from "../utils/jwt.js";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async signup(data: ISignupDTO): Promise<IAuthResponse> {
    const existingUser = await this.authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email is already registered.");
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await this.authRepository.createUser({
      key: data.key,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
    });

    const accessToken = generateAccessToken(user.key);

    return {
      accessToken,
      isSuccess: true,
      user: {
        key: user.key,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }

  public async login(data: ILoginDTO): Promise<IAuthResponse> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user || !user.passwordHash) {
      throw new Error("Invalid email or password.");
    }

    const passwordIsValid = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!passwordIsValid) {
      throw new Error("Invalid email or password.");
    }

    const accessToken = generateAccessToken(user.key);

    return {
      accessToken,
      isSuccess: true,
      user: {
        key: user.key,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }

  public async getCurrentUser(userId: string): Promise<IAuthUserView | null> {
    const user = await this.authRepository.findByKey(userId);

    if (!user) {
      return null;
    }

    return {
      key: user.key,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  public async isAuthenticated(userKey: string | undefined): Promise<boolean> {
    if (!userKey) {
      return false;
    }

    const user = await this.authRepository.findByKey(userKey);

    return user !== null;
  }
}

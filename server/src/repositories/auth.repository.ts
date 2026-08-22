import { User, UserModel } from "../models/user/userModel.js";

export class AuthRepository {
  public async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).select("+passwordHash").exec();
  }

  public async findById(id: string): Promise<User | null> {
    return UserModel.findById(id).exec();
  }

  public async findByKey(key: string): Promise<User | null> {
    return UserModel.findOne({ key: key }).exec();
  }

  public async createUser(data: Partial<User>): Promise<User> {
    return UserModel.create(data);
  }
}

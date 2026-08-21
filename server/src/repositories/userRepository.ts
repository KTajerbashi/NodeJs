import { BaseRepository } from "./base/baseRepository.js";
import { User, UserModel } from "../models/user/userModel.js";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }
}

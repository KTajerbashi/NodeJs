import { BaseRepository } from "./base/base.repository.js";
import { User, UserModel } from "../models/user/userModel.js";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }
}

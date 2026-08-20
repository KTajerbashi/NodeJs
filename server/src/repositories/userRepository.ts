import { UserModel } from "../models/userModel.js";

export class UserRepository {
  async findAll() {
    console.log("[findAll]");
    return UserModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    console.log("[findById] ", id);
    return UserModel.findById(id);
  }

  async create(data: { firstName: string; lastName: string; email: string }) {
    console.log("[create] ", data);
    return UserModel.create(data);
  }

  async update(
    id: string,
    data: Partial<{
      firstName: string;
      lastName: string;
      email: string;
    }>,
  ) {
    console.log("[update] ", id, data);
    return UserModel.findOneAndUpdate({ key: id }, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    console.log("[delete] ", id);
    return UserModel.findOneAndDelete({ key: id });
  }
}

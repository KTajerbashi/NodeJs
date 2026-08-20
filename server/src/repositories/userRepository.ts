import { UserModel } from "../models/userModel.js";

export class UserRepository {
  async findAll() {
    return UserModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async create(data: { firstName: string; lastName: string; email: string }) {
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
    return UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}

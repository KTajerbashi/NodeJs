import { UserRepository } from "../repositories/userRepository.js";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: string) {
    return this.userRepository.findById(id);
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    return this.userRepository.create(data);
  }

  async updateUser(
    id: string,
    data: Partial<{
      firstName: string;
      lastName: string;
      email: string;
    }>,
  ) {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}

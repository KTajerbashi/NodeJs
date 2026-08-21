import { BaseService } from "./base/baseService.js";
import { User } from "../models/user/userModel.js";
import { UserRepository } from "../repositories/userRepository.js";

export class UserService extends BaseService<IUserDTO, IUserView, User> {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }

  protected toEntity(data: IUserDTO): Partial<User> {
    return {
      key: data.key,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
  }

  protected toView(entity: User): IUserView {
    return {
      key: entity.key,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
    };
  }
}

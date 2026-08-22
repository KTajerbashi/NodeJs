import bcrypt from "bcrypt";
import { BaseService } from "./base/base.service.js";
import { User } from "../models/user/userModel.js";
import { UserRepository } from "../repositories/user.repository.js";

export class UserService extends BaseService<IUserDTO, IUserView, User> {
  constructor(repository: UserRepository) {
    super(repository);
  }

  public override async onCreateAsync(data: IUserDTO): Promise<IUserView> {
    const passwordHash = await bcrypt.hash(data.password, 12);

    const entity: Partial<User> = {
      key: data.key,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
    };

    const result = await this.repository.add(entity);

    return this.toView(result);
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

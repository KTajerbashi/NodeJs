import { Role } from "../models/role/roleModel.js";
import { BaseService } from "./base/baseService.js";
import { RoleRepository } from "../repositories/roleRepository.js";
import { DefaultTimestampProps } from "mongoose";

export class RoleService extends BaseService<IRoleDTO, IRoleView, Role> {
  constructor(repository: RoleRepository) {
    super(repository);
  }

  protected toEntity(
    data: IRoleDTO,
  ): Partial<
    { key: string; title: string; code: string } & DefaultTimestampProps
  > {
    return {
      key: data.key,
      title: data.title,
      code: data.code,
    };
  }

  protected toView(
    entity: {
      key: string;
      title: string;
      code: string;
    } & DefaultTimestampProps,
  ): IRoleView {
    return {
      key: entity.key,
      title: entity.title,
      code: entity.code,
    };
  }
}

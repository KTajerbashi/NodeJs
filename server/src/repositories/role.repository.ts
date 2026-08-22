import { Role, RoleModel } from "../models/role/roleModel.js";
import { BaseRepository } from "./base/base.repository.js";

export class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(RoleModel);
  }
}

import EntityService from "./base/entity.service";

class PrivilegeSerivce extends EntityService {
  constructor() {
    super("privilege");
  }
}

export default new PrivilegeSerivce();

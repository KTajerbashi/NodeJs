import EntityService from "./base/entity.service";

class GroupSerivce extends EntityService {
  constructor() {
    super("group");
  }
}

export default new GroupSerivce();

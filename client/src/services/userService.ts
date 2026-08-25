import EntityService from "./base/entity.service";

class UserService extends EntityService {
  constructor() {
    super("users");
  }
}

export default new UserService();

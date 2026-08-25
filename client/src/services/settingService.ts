import EntityService from "./base/entity.service";

class SettingSerivce extends EntityService {
  constructor() {
    super("settings");
  }
}

export default new SettingSerivce();

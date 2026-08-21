import { BaseRepository } from "./base/baseRepository.js";
import { Setting, SettingModel } from "../models/setting/settingModel.js";

export class SettingRepository extends BaseRepository<Setting> {
  constructor() {
    super(SettingModel);
  }
}

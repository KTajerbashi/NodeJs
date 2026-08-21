import { BaseService } from "./base/baseService.js";
import { Setting } from "../models/setting/settingModel.js";
import { SettingRepository } from "../repositories/settingRepository.js";

export class SettingService extends BaseService<
  ISettingDTO,
  ISettingView,
  Setting
> {
  constructor(repository: SettingRepository) {
    super(repository);
  }

  protected toEntity(data: ISettingDTO): Partial<Setting> {
    return {
      key: data.key,
      title: data.title,
      value: data.value,
    };
  }

  protected toView(entity: Setting): ISettingView {
    return {
      key: entity.key,
      title: entity.title,
      value: entity.value,
    };
  }
}

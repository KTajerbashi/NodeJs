import BaseApiService from "./base/baseApiService";

class SettingSerivce extends BaseApiService {
  constructor() {
    super("settings");
  }

  getAll() {
    return this.get<ISetting[]>("");
  }

  getById(id: string) {
    return this.get<ISetting>(`/${id}`);
  }

  create(role: ISettingRequest) {
    return this.post<ISettingRequest, ISettingResponse>("", role);
  }

  update(id: string, role: ISettingRequest) {
    return this.put<ISettingRequest, ISettingResponse>(`${id}`, role);
  }

  remove(id: string) {
    return this.delete<boolean>(`${id}`);
  }
}

export default new SettingSerivce();

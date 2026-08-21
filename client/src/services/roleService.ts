import BaseApiService from "./base/baseApiService";

class RoleSerivce extends BaseApiService {
  constructor() {
    super("roles");
  }

  getAll() {
    return this.get<IRole[]>("");
  }

  getById(id: string) {
    return this.get<IRole>(`${id}`);
  }

  create(role: IRoleRequest) {
    return this.post<IRoleRequest, IRoleResponse>("", role);
  }

  update(id: string, role: IRoleRequest) {
    return this.put<IRoleRequest, IRoleResponse>(`${id}`, role);
  }

  remove(id: string) {
    return this.delete<boolean>(`${id}`);
  }
}

export default new RoleSerivce();

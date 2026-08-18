import BaseApiService from "./base/baseApiService";

class RoleSerivce extends BaseApiService {
  getAll() {
    return this.get<IRole[]>("/roles");
  }

  getById(id: string) {
    return this.get<IRole>(`/roles/${id}`);
  }

  create(role: IRoleRequest) {
    return this.post<IRoleRequest, IRoleResponse>("/roles", role);
  }

  update(id: string, role: IRoleRequest) {
    return this.put<IRoleRequest, IRoleResponse>(`/roles/${id}`, role);
  }

  remove(id: string) {
    return this.delete<void>(`/roles/${id}`);
  }
}

export default new RoleSerivce();

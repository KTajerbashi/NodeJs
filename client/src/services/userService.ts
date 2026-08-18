import BaseApiService from "./base/baseApiService";

class UserService extends BaseApiService {
  getAll() {
    return this.get<IUser[]>("/users")
      .then((x) => x)
      .catch((e) => console.error(e));
  }

  getById(id: string) {
    return this.get<IUser>(`/users/${id}`);
  }

  create(user: UserRequest) {
    return this.post<UserRequest, UserResponse>("/users", user);
  }

  update(id: string, user: UserRequest) {
    return this.put<UserRequest, UserResponse>(`/users/${id}`, user);
  }

  remove(id: string) {
    return this.delete<void>(`/users/${id}`);
  }
}
export default new UserService();

import BaseApiService from "./base/baseApiService";

class UserService extends BaseApiService {
  getAll(): Promise<IUser[]> {
    return this.get<IUser[]>("/users");
  }

  getById(id: string): Promise<IUser> {
    return this.get<IUser>(`/users/${id}`);
  }

  create(user: UserRequest): Promise<UserResponse> {
    return this.onCreate<UserRequest, UserResponse>("/users", user);
  }

  update(id: string, user: UserRequest): Promise<UserResponse> {
    return this.put<UserRequest, UserResponse>(`/users/${id}`, user);
  }

  remove(id: string): Promise<void> {
    return this.delete<void>(`/users/${id}`);
  }
}

export default new UserService();
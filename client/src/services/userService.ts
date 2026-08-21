import BaseApiService from "./base/baseApiService";

class UserService extends BaseApiService {
  constructor() {
    super("users");
  }
  getAll(): Promise<IUser[]> {
    return this.get<IUser[]>("");
  }

  getById(id: string): Promise<IUser> {
    return this.get<IUser>(`${id}`);
  }

  create(user: UserRequest): Promise<UserResponse> {
    return this.onCreate<UserRequest, UserResponse>("", user);
  }

  update(id: string, user: UserRequest): Promise<UserResponse> {
    return this.put<UserRequest, UserResponse>(`${id}`, user);
  }

  remove(id: string): Promise<void> {
    return this.delete<void>(`${id}`);
  }
}

export default new UserService();

import BaseApiService from "./base/baseApiService";
const accessToken = "accessToken";
class AuthService extends BaseApiService {
  constructor() {
    super("auth");
  }

  public logout(): void {
    sessionStorage.removeItem(accessToken);
    localStorage.removeItem(accessToken);
  }

  public login(email: string, password: string) {
    return this.post<ILoginDTO, IAuthResponse>("login", {
      email: email,
      password: password,
    });
  }

  public signup(model: IUser) {
    return this.post<IUser, IAuthResponse>("signup", model);
  }

  public getCurrentUser() {
    return this.get<IUser>("current-user");
  }

  public isAuthentication() {
    return this.get<boolean>("is-authenticated");
  }
  
  public getAccessToken() {
    return localStorage.getItem(accessToken);
  }
}

export default new AuthService();

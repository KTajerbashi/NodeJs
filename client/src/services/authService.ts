import BaseApiService from "./base/base.api.service";
import alertService from "./configs/alertService";

const ACCESS_TOKEN = "accessToken";

class AuthService extends BaseApiService {
  constructor() {
    super("auth");
  }

  public async logout(): Promise<void> {
    sessionStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);

    await alertService.success(
      "You have been signed out successfully.",
      "Logout",
    );
  }

  public async login(email: string, password: string) {
    try {
      const response = await this.post<ILoginDTO, IAuthResponse>("login", {
        email,
        password,
      });

      console.log("[login].[response]", response);

      if (response.isSuccess) {
        alertService.success(
          `${response.data.user.firstName} ${response.data.user.lastName}`,
          "Welcome! Login successful",
        );

        if (response.data.accessToken) {
          localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        }
      } else {
        alertService.error(response.message || "Invalid email or password.");
      }

      return response;
    } catch (error) {
      alertService.error(
        "Unable to login. Please check your email and password.",
      );

      throw error;
    }
  }

  public async signup(model: IUser) {
    try {
      const response = await this.post<IUser, IAuthResponse>("signup", model);

      if (response.isSuccess) {
        alertService.success(
          response.message || "Account created successfully.",
        );
      } else {
        alertService.error(
          response.message || "Unable to create your account.",
        );
      }

      return response;
    } catch (error) {
      alertService.error("Unable to create your account. Please try again.");

      throw error;
    }
  }

  public getCurrentUser() {
    return this.get<IUser>("current-user");
  }

  public isAuthentication() {
    return this.get<boolean>("is-authenticated");
  }

  public getStoredAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  public validateAccessToken() {
    return this.get<IAuthResponse>("access-token");
  }
}

export default new AuthService();

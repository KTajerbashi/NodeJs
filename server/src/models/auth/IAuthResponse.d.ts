interface IAuthResponse {
  accessToken: string;
  message: string;
  user: IAuthUserView;
  isSuccess: boolean;
}

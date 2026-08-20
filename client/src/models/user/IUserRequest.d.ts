interface UserRequest extends IBaseModel {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

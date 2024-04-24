export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin"
}

export type LoginInfo = {
  email: string;
  password: string;
}

export type RegisterUserInfo = LoginInfo & {
  firstname: string;
  lastname: string;
  username: string;
  address: string;
  avatar: string;
}

export type User = RegisterUserInfo & UserRoleAndActive & {
  _id: string;
}

export type UserToken = {
  accessToken: string,
  refreshToken: string
}

export type LoggedUserInfo = {
  user: User;
  tokens: UserToken;
}

export type PasswordUpdate = {
  oldPassword: string;
  newPassword: string;
}

export type UserRoleAndActive = {
  role: UserRole;
  active: boolean
}

export type UserForgetPassword = {
  userEmail: string;
}
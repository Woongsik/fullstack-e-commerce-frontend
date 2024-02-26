export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin"
}

export type LoginUserInfo = {
  email: string,
  password: string
}

export type RegisterUserInfo = LoginUserInfo & {
  name: string,
  avatar: string
}

export type User = RegisterUserInfo & {
  id: number,
  role: UserRole
}

export type UserToken = {
  access_token: string,
  refresh_token: string
}
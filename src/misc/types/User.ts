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
  avatar: string,
  role: UserRole
}

export type User = RegisterUserInfo & {
  id: number
}

export type UserToken = {
  access_token: string,
  refresh_token: string
}
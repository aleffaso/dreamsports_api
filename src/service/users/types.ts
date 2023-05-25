type User = {
  id?: string;
  name?: string;
  email?: string;
  admin?: boolean;
  is_active?: boolean;
};

type UserPassword = {
  password?: string;
};

export type UserCreate = {
  name: User["name"];
  email: User["email"];
  admin: User["admin"];
  is_active?: User["is_active"];
  password: UserPassword["password"];
};

export type UserUpdate = User & UserPassword;

export type UserRequest = {
  email: User["email"];
  password: UserPassword["password"];
};

export type UserResponse = User;

export type UserId = {
  id: User["id"];
};

export type UserJWTToken = {
  id?: string;
  expiresIn?: number;
  userId?: string;
  refresh_token?: string;
  token?: string;
};

export type UserJWTTokenCreate = {
  userId: UserJWTToken["userId"];
  refresh_token?: UserJWTToken["refresh_token"];
};

export type UserJWTTokenResponse = Omit<
  UserJWTToken,
  "id" | "expiresIn" | "userId"
>;

export type UserJWTTokenRequest = {
  refresh_token?: UserJWTToken["refresh_token"];
};

export type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

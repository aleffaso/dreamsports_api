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

export type UserRefreshToken = {
  id?: string;
  expiresIn?: number;
  userId?: string;
  refresh_token?: string;
};

export type UserRefreshTokenCreate = {
  userId: UserRefreshToken["userId"];
  refresh_token?: UserRefreshToken["refresh_token"];
};

export type UserRefreshTokenResponse = {
  id: UserRefreshToken["id"];
};

export type UserRefreshTokenRequest = {
  refresh_token?: UserRefreshToken["refresh_token"];
};

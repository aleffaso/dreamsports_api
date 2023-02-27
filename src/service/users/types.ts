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

export type UserResponse = {
  id: User["id"];
  name: User["name"];
  email: User["email"];
  admin: User["admin"];
  is_active: User["is_active"];
};

export type UserId = {
  id: User["id"];
};

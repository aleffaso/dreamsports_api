export type Customer = {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  zipCode?: string;
  streetAddress?: string;
  numberAddress?: string;
  referenceAddress?: string;
  city?: string;
  state?: string;
  country?: string;
};

export type CustomerPassword = {
  password?: string;
};

export type CustomerFullName = {
  fullName?: string;
};

export type CustomerCreate = {
  firstName: Customer["firstName"];
  lastName: Customer["lastName"];
  fullName?: CustomerFullName["fullName"];
  phoneNumber: Customer["phoneNumber"];
  email: Customer["email"];
  zipCode: Customer["zipCode"];
  streetAddress: Customer["streetAddress"];
  numberAddress: Customer["numberAddress"];
  referenceAddress: Customer["referenceAddress"];
  city: Customer["city"];
  state: Customer["state"];
  country: Customer["country"];
  password: CustomerPassword["password"];
};

export type CustomerUpdate = Customer & CustomerFullName & CustomerPassword;

export type CustomerRequest = {
  email: Customer["email"];
  password: CustomerPassword["password"];
};

export type CustomerResponse = {
  id: Customer["id"];
  fullName: CustomerFullName["fullName"];
  email: Customer["email"];
  phoneNumber?: Customer["phoneNumber"];
  zipCode?: Customer["zipCode"];
  streetAddress?: Customer["streetAddress"];
  numberAddress?: Customer["numberAddress"];
  referenceAddress?: Customer["referenceAddress"];
  city?: Customer["city"];
  state?: Customer["state"];
  country?: Customer["country"];
};

export type CustomerId = {
  id: Customer["id"];
};

export type CustomerRefreshToken = {
  id?: string;
  expiresIn?: number;
  customerId?: string;
  refresh_token?: string;
};

export type CustomerRefreshTokenCreate = {
  customerId: CustomerRefreshToken["customerId"];
  refresh_token?: CustomerRefreshToken["refresh_token"];
};

export type CustomerRefreshTokenResponse = {
  id: CustomerRefreshToken["id"];
};

export type CustomerRefreshTokenRequest = {
  refresh_token?: CustomerRefreshToken["refresh_token"];
};

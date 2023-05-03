export type Customer = {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phoneNumber?: number;
  email?: string;
  zipCode?: number;
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

export type CustomerCreate = {
  firstName: Customer["firstName"];
  lastName: Customer["lastName"];
  fullName: Customer["fullName"];
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

export type UserUpdate = Customer & CustomerPassword;

export type CustomerResponse = Customer;

export type CustomerId = {
  id: Customer["id"];
};

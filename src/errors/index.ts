export class DoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = message;
  }
  status() {
    return 401;
  }
}

export class AlreadyExistsError extends Error {
  constructor({ message }: any) {
    super(message);
    this.name = "AlreadyExistsError";
  }
  get status() {
    return 409;
  }
}

export class ForbiddenError extends Error {
  constructor({ message }: any) {
    super(message);
    this.name = "ForbiddenError";
  }
  get status() {
    return 403;
  }
}

export class ServiceUnavailableError extends Error {
  constructor({ message }: any) {
    super(message);
    this.name = "ServiceUnavailableError";
  }
  get status() {
    return 503;
  }
}

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
  constructor(message: string) {
    super(message);
    this.name = message;
  }
  status() {
    return 409;
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = message;
  }
  status() {
    return 403;
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = message;
  }
  status() {
    return 503;
  }
}

export class InvalidDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = message;
  }
  status() {
    return 400;
  }
}

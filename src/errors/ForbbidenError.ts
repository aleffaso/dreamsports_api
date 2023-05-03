class ForbiddenError extends Error {
  constructor({ message }: any) {
    super(message);
    this.name = "ForbiddenError";
  }
  get status() {
    return 403;
  }
}

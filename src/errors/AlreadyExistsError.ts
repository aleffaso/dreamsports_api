class AlreadyExistsError extends Error {
  constructor({ message }: any) {
    super(message);
    this.name = "AlreadyExistsError";
  }
  get status() {
    return 409;
  }
}

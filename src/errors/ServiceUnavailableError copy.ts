class DoesNotExistError extends Error {
  constructor({ message }: any) {
    super(message);
    this.name = "DoesNotExistError";
  }
  get status() {
    return 401;
  }
}

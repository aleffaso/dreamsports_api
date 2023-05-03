class ServiceUnavailableError extends Error {
  constructor({ message }: any) {
    super(message);
    this.name = "ServiceUnavailableError";
  }
  get status() {
    return 503;
  }
}

export class Exception<T = any> extends Error {
  error: T;
  status: string;

  constructor(message: string, status: string, error: T) {
    super(message);
    this.error = error;
    this.status = status;
  }
}

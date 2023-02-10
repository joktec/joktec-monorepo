export class Exception<T = any> extends Error {
  status: string;
  data: T;

  constructor(message: string, status: string, data: T) {
    super(message);
    this.status = status;
    this.data = data;
  }

  public getError = () => ({ status: this.status, message: this.message, data: this.data });
}

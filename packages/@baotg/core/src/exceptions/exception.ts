export class Exception<T = any> extends Error {
  status: number;
  data: T;

  constructor(message: string, status: number, data: T) {
    super(message);
    this.status = status;
    this.data = data;
  }

  public getError = () => ({ status: this.status, message: this.message, data: this.data });
}

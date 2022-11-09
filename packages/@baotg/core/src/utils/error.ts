import { isDev } from '.';

class MyError extends Error {
  readonly operational?: boolean;

  constructor(err: Error | string, operational = false) {
    super();

    this.name = err instanceof Error ? err.name : 'Error';
    this.message = err instanceof Error ? err.message : err;
    this.operational = operational;
  }
}

/**
 * HttpError that takes the first parameter as an Http Status Code
 */
class HttpError extends MyError {
  readonly code: number;

  constructor(code: number, err: Error | string) {
    super(err, true);

    this.code = code;
    this.name = 'HttpError';
  }

  toJSON() {
    const content = {
      code: this.code,
      message: this.message,
    };

    return !isDev() ? content : { ...content, error: this.stack };
  }
}

export { MyError, HttpError };

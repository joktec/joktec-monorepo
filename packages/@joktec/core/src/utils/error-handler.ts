import { MyError } from './error';
import logger from './logger';

/**
 * Log error to destination then exit the process if programmer error
 * @param err error to be handled
 */
const handle = (err: MyError) => {
  // TODO
  // E.g. log to sentry
  // E.g. log to console
  logger.error(err);

  if (!err.operational) {
    logger.info('> App exited!');

    process.exit(1);
  }
};

export default { handle };

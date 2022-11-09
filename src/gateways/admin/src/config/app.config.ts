import { registerAs } from '@nestjs/config';
import { toNumber, getEnv } from '@baotg/core';
import { Environment } from '@app/app.constants';

export default registerAs('app', () => ({
  port: toNumber(getEnv('PORT')),
  origin: getEnv('CROSS_ORIGIN'),
  credentials: true,
  isDevelopment: Environment.DEVELOPMENT,
  isProduction: Environment.PRODUCTION,
}));

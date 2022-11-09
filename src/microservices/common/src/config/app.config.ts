import { registerAs } from '@nestjs/config';
import { toNumber, getEnv } from '@jobhopin/core';
import { Environment } from '@app/app.constants';

export default registerAs('app', () => ({
    port: toNumber(getEnv('PORT')),
    credentials: true,
    isDevelopment: Environment.DEVELOPMENT,
    isProduction: Environment.PRODUCTION,
}));

import { registerAs } from '@nestjs/config';
import { toNumber, getEnv } from '@baotg/core';

export default registerAs('microservice', () => ({
    commonServiceHost: getEnv('COMMON_SERVICE_HOST'),
    commonServicePort: toNumber(getEnv('COMMON_SERVICE_PORT')),
}));

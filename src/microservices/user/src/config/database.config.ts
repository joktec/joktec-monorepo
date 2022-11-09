import { registerAs } from '@nestjs/config';
import { getEnv } from '@jobhopin/core';

export default registerAs('database', () => ({
    mongoDbUrl: getEnv('MONGODB_URL'),
}));

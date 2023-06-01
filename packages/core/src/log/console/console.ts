import { DestinationStream } from 'pino';

export const createConsoleStream = (): DestinationStream => process.stdout;

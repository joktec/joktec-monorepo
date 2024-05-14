import pino from 'pino';

export type LogLevel = pino.Level;
export const LogLevel: pino.Level[] = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

export enum LogSocketMode {
  TCP = 'tcp',
  UDP = 'UDP',
}

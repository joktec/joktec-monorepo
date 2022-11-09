export const createConsoleStream = (level = 'trace') => ({
  level,
  stream: process.stdout,
});

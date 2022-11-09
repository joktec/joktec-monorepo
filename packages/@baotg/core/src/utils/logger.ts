const log = (...args: any) => console.log(`LOG:${Date.now()}`, ...args);
const info = (...args: any) => console.info(`INF:${Date.now()}`, ...args);
const error = (...args: any) => console.error(`ERR:${Date.now()}`, ...args);

export default { log, info, error };

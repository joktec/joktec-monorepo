export const sleep = async (n: number) => {
  return n ? new Promise<void>(resolve => setTimeout(resolve, n)) : undefined;
};

export const includes = <T>(array: Array<T>, ...values: T[]): boolean => {
  if (!array.length || !values.length) return false;
  return values.every(value => array.includes(value));
};

export const someIncludes = <T>(array: Array<T>, ...values: T[]): boolean => {
  if (!array.length || !values.length) return false;
  return values.some(value => array.includes(value));
};

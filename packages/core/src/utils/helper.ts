export const sleep = async (n: number) => {
  return n ? new Promise<void>(resolve => setTimeout(resolve, n)) : undefined;
};

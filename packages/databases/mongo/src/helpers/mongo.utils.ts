export const mongoDebug = (collectionName: string, methodName: string, ...methodArgs: any[]): string => {
  const args: string = methodArgs
    .map(arg => {
      if (typeof arg === 'object') {
        return JSON.stringify(arg).replace(/"/g, '');
      }
      return arg;
    })
    .join(', ');

  let mongoShell = `db.${collectionName}.${methodName}(${args})`;
  if (methodName === 'find' || methodName === 'findOne') {
    const projection = methodArgs[1] || {};
    const options = methodArgs[2] || {};
    mongoShell = `db.${collectionName}.${methodName}(${args}).projection(${JSON.stringify(projection)})`;

    if (options.sort) mongoShell += `.sort(${JSON.stringify(options.sort)})`;
    if (options.skip) mongoShell += `.skip(${options.skip})`;
    if (options.limit) mongoShell += `.limit(${options.limit})`;
  }
  return mongoShell;
};

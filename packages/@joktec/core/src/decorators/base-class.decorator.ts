const getMethods = (obj: any) =>
  Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function' && item !== 'constructor');

export const BaseClassDecorator = (methodDecorator: MethodDecorator): ClassDecorator => {
  return (target: any) => {
    const methods = getMethods(target.prototype);
    for (const methodName of methods) {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, methodName);
      if (descriptor && descriptor.value instanceof Function) {
        const decoratedDescriptor = methodDecorator(target.prototype, methodName, descriptor);
        // if (decoratedDescriptor) {
        //   Object.defineProperty(target.prototype, methodName, decoratedDescriptor);
        // }
      }
    }
  };
};

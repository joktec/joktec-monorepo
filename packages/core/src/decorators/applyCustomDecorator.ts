export type Decorator = (...args: any) => MethodDecorator;

export const applyCustomDecorator = (clazz: any, method: string, decorator: Decorator, ...params: any[]) => {
  const target = clazz.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(target, method);
  decorator(...params)(target, method, descriptor);
};

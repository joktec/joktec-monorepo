export type Decorator = (...args: any) => MethodDecorator;

export const applyCustomDecorator = (clazz: any, method: string, decorator: Decorator, ...params: any[]) => {
  const target = clazz.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(target, method);
  decorator(...params)(target, method, descriptor);
};

export function extendMetadata<T extends Record<string, any>[] = any[]>(metadata: T, metaKey: string, target: object) {
  const existingMetadata = Reflect.getMetadata(metaKey, target);
  if (!existingMetadata) {
    return metadata;
  }
  return existingMetadata.concat(metadata);
}
